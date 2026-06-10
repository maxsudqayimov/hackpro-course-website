from __future__ import annotations

from dataclasses import dataclass


@dataclass
class SpeechResult:
    text: str
    ok: bool
    message: str = ""


class SpeechListener:
    def __init__(
        self,
        language: str = "uz-UZ",
        languages: tuple[str, ...] | None = None,
        timeout: int = 3,
        phrase_time_limit: int = 5,
    ) -> None:
        self.language = language
        self.languages = languages or (language,)
        self.timeout = timeout
        self.phrase_time_limit = phrase_time_limit
        self.available = False
        self.error = ""
        self._calibrated = False
        self._recognizer = None
        self._microphone_class = None

        try:
            import speech_recognition as sr  # type: ignore

            self._recognizer = sr.Recognizer()
            self._recognizer.dynamic_energy_threshold = True
            self._recognizer.energy_threshold = 260
            self._recognizer.pause_threshold = 0.8
            self._recognizer.non_speaking_duration = 0.4
            self._microphone_class = sr.Microphone
            self.available = True
        except Exception as exc:
            self.error = str(exc)

    def listen_once(self) -> SpeechResult:
        if not self.available or self._recognizer is None or self._microphone_class is None:
            return SpeechResult("", False, f"Microphone dependencies are not ready: {self.error}")

        try:
            with self._microphone_class() as source:
                if not self._calibrated:
                    self._recognizer.adjust_for_ambient_noise(source, duration=0.35)
                    self._calibrated = True
                audio = self._recognizer.listen(
                    source,
                    timeout=self.timeout,
                    phrase_time_limit=self.phrase_time_limit,
                )
        except Exception as exc:
            return SpeechResult("", False, f"Listening failed: {exc}")

        last_error = ""
        for language in self.languages:
            try:
                result = self._recognizer.recognize_google(audio, language=language, show_all=True)
                text = self._best_transcript(result)
                if not text:
                    raise ValueError("empty transcript")
                return SpeechResult(text.strip(), True)
            except Exception as exc:
                last_error = str(exc)
        return SpeechResult("", False, f"Speech recognition failed: {last_error}")

    @staticmethod
    def _best_transcript(result: object) -> str:
        if isinstance(result, dict):
            alternatives = result.get("alternative") or []
            if alternatives:
                return str(alternatives[0].get("transcript", ""))
        return ""
