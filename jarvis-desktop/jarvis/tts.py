from __future__ import annotations

import base64
import asyncio
import platform
import queue
import subprocess
import threading
import uuid
from pathlib import Path

from .config import DATA_DIR


class Speaker:
    def __init__(
        self,
        rate: int = 0,
        volume: int = 90,
        provider: str = "edge",
        edge_voice: str = "uz-UZ-SardorNeural",
    ) -> None:
        self.rate = rate
        self.volume = volume
        self.provider = provider
        self.edge_voice = edge_voice
        self._queue: queue.Queue[str] = queue.Queue()
        self._engine = None
        self._lock = threading.Lock()
        try:
            import pyttsx3  # type: ignore

            self._engine = pyttsx3.init()
            self._engine.setProperty("rate", 180 + (rate * 10))
            self._engine.setProperty("volume", max(0.0, min(volume / 100, 1.0)))
        except Exception:
            self._engine = None
        self._worker = threading.Thread(target=self._speak_loop, daemon=True)
        self._worker.start()

    def say(self, text: str) -> None:
        if not text:
            return
        with self._lock:
            if self.provider == "edge" and self._say_with_edge(text):
                return
            if self._engine is not None:
                try:
                    self._engine.say(text)
                    self._engine.runAndWait()
                    return
                except Exception:
                    pass
            self._say_with_windows_sapi(text)

    def say_async(self, text: str) -> None:
        if text:
            if self._queue.qsize() > 4:
                return
            self._queue.put(text)

    def _speak_loop(self) -> None:
        while True:
            text = self._queue.get()
            self.say(text)
            self._queue.task_done()

    def _say_with_edge(self, text: str) -> bool:
        try:
            import edge_tts  # type: ignore
        except Exception:
            return False

        audio_dir = DATA_DIR / "tts"
        audio_dir.mkdir(exist_ok=True)
        path = audio_dir / f"jarvis-{uuid.uuid4().hex}.mp3"
        try:
            asyncio.run(self._edge_save(edge_tts, text, path))
            self._play_mp3(path)
            return True
        except Exception:
            return False
        finally:
            try:
                path.unlink(missing_ok=True)
            except Exception:
                pass

    async def _edge_save(self, edge_tts_module: object, text: str, path: Path) -> None:
        rate = f"{self.rate:+d}%"
        communicate = edge_tts_module.Communicate(
            text=text,
            voice=self.edge_voice,
            rate=rate,
            volume="+0%",
        )
        await communicate.save(str(path))

    def _play_mp3(self, path: Path) -> None:
        if platform.system().lower() != "windows":
            return

        safe_path = str(path).replace("'", "''")
        script = (
            "Add-Type -AssemblyName PresentationCore; "
            "$p = New-Object System.Windows.Media.MediaPlayer; "
            f"$p.Open([Uri]::new('{safe_path}')); "
            f"$p.Volume = {max(0.0, min(self.volume / 100, 1.0))}; "
            "$p.Play(); "
            "$tries = 0; "
            "while (-not $p.NaturalDuration.HasTimeSpan -and $tries -lt 50) { "
            "Start-Sleep -Milliseconds 100; $tries++ }; "
            "$duration = 4000; "
            "if ($p.NaturalDuration.HasTimeSpan) { "
            "$duration = [Math]::Min(30000, [int]$p.NaturalDuration.TimeSpan.TotalMilliseconds + 500) }; "
            "Start-Sleep -Milliseconds $duration; "
            "$p.Close();"
        )
        encoded = base64.b64encode(script.encode("utf-16le")).decode("ascii")
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        subprocess.run(
            ["powershell", "-NoProfile", "-EncodedCommand", encoded],
            check=False,
            creationflags=creationflags,
        )

    def _say_with_windows_sapi(self, text: str) -> None:
        if platform.system().lower() != "windows":
            print(text)
            return

        safe_text = text.replace("'", "''")
        script = (
            "Add-Type -AssemblyName System.Speech; "
            "$s = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
            f"$s.Rate = {self.rate}; "
            f"$s.Volume = {self.volume}; "
            f"$s.Speak('{safe_text}');"
        )
        encoded = base64.b64encode(script.encode("utf-16le")).decode("ascii")
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        try:
            subprocess.run(
                ["powershell", "-NoProfile", "-EncodedCommand", encoded],
                check=False,
                creationflags=creationflags,
            )
        except Exception:
            print(text)
