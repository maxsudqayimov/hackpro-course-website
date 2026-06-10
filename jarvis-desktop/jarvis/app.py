from __future__ import annotations

import queue
import threading
import time
import tkinter as tk
from tkinter import ttk

from .assistant import JarvisAssistant
from .config import get_settings
from .metrics import JarvisMetrics
from .speech import SpeechListener
from .tts import Speaker


BG = "#02070b"
PANEL = "#061722"
PANEL_2 = "#081f2d"
CYAN = "#22e6ff"
BLUE = "#0d7dff"
GREEN = "#42ffb0"
PINK = "#ff3b7f"
PURPLE = "#8b5cff"
TEXT = "#e6fbff"
MUTED = "#75a7b7"
WARNING = "#ffb545"
ORANGE = "#ff7a18"


class JarvisVisualizer(tk.Canvas):
    def __init__(self, master: tk.Misc) -> None:
        super().__init__(master, bg=BG, highlightthickness=0, bd=0)
        self.mode = "idle"
        self.angle = 0
        self.last_size: tuple[int, int] = (0, 0)
        self.bind("<Configure>", lambda _event: self.redraw())
        self.after(150, self.animate)

    def set_mode(self, mode: str) -> None:
        self.mode = mode
        self.redraw()

    def animate(self) -> None:
        self.angle = (self.angle + 6) % 360
        self.redraw()
        self.after(150, self.animate)

    def redraw(self) -> None:
        self.delete("all")
        width = max(self.winfo_width(), 1)
        height = max(self.winfo_height(), 1)
        if width < 20 or height < 20:
            return
        cx = width / 2
        cy = height / 2 - 8
        size = min(width, height) * 0.56
        radius = size / 2

        self._iron_background(width, height)
        self._arc_reactor(cx, cy, radius)
        self._robot_face(cx, cy, radius)
        self._waveform(cx, cy + radius + 64, min(width * 0.7, 620))
        self._hud(cx, cy, radius)

    def _iron_background(self, width: int, height: int) -> None:
        for x in range(28, width, 86):
            self.create_line(x, 20, x, height - 20, fill="#082330")
        for y in range(32, height, 74):
            self.create_line(22, y, width - 22, y, fill="#082330")
        self.create_line(40, 38, 160, 38, fill=CYAN, width=2)
        self.create_line(width - 160, 38, width - 40, 38, fill=CYAN, width=2)
        self.create_line(40, height - 38, 190, height - 38, fill=ORANGE, width=2)
        self.create_line(width - 190, height - 38, width - 40, height - 38, fill=ORANGE, width=2)
        labels = [
            ("OWNER: MUROD", 44, 58),
            ("JARVISBEK ONLINE", width - 205, 58),
            ("AI CONVERSATION CORE", 44, height - 62),
        ]
        for text, x, y in labels:
            self.create_text(x, y, text=text, fill=MUTED, font=("Consolas", 9, "bold"), anchor="w")
        self.create_text(width * 0.2, height * 0.5, text="MUROD", fill="#0f5f70", font=("Consolas", 18, "bold"))
        self.create_text(width * 0.8, height * 0.5, text="JARVISBEK", fill="#0f5f70", font=("Consolas", 18, "bold"))
        self.create_line(width * 0.25, height * 0.5, width * 0.38, height * 0.5, fill=CYAN, width=2)
        self.create_line(width * 0.62, height * 0.5, width * 0.75, height * 0.5, fill=CYAN, width=2)

    def _arc_reactor(self, cx: float, cy: float, radius: float) -> None:
        active = self.mode in {"listening", "thinking", "speaking"}
        base = CYAN if self.mode == "idle" else GREEN if self.mode == "listening" else WARNING if self.mode == "thinking" else ORANGE
        for scale, color in [(1.7, "#03111a"), (1.4, "#062637"), (1.08, "#02070b")]:
            r = radius * scale
            self.create_oval(cx - r, cy - r, cx + r, cy + r, fill=color, outline="")

        for i, color in enumerate([CYAN, BLUE, ORANGE, GREEN]):
            r = radius * (0.92 + i * 0.18)
            start = (self.angle * (1.2 + i * 0.28) + i * 47) % 360
            self.create_arc(
                cx - r,
                cy - r,
                cx + r,
                cy + r,
                start=start,
                extent=82 if active else 42,
                outline=color,
                style="arc",
                width=3,
            )

        triangle = [
            cx,
            cy - radius * 0.55,
            cx - radius * 0.52,
            cy + radius * 0.38,
            cx + radius * 0.52,
            cy + radius * 0.38,
        ]
        self.create_polygon(triangle, outline=CYAN, fill="", width=2)
        inner = radius * 0.36
        self.create_oval(cx - inner, cy - inner, cx + inner, cy + inner, fill="#04141d", outline=base, width=3)
        pulse = radius * (0.09 if active else 0.045)
        self.create_oval(cx - pulse, cy - pulse, cx + pulse, cy + pulse, fill=base, outline="")
        for i in range(12):
            angle = (i * 30 + self.angle) % 360
            length = radius * (0.74 if i % 2 else 0.58)
            x1 = cx + radius * 0.42 * self._cos(angle)
            y1 = cy + radius * 0.42 * self._sin(angle)
            x2 = cx + length * self._cos(angle)
            y2 = cy + length * self._sin(angle)
            self.create_line(x1, y1, x2, y2, fill=base, width=2)

    def _robot_face(self, cx: float, cy: float, radius: float) -> None:
        active = self.mode in {"listening", "thinking", "speaking"}
        face_w = radius * 0.92
        face_h = radius * 1.05
        left = cx - face_w / 2
        top = cy - face_h / 2 + radius * 0.04
        right = cx + face_w / 2
        bottom = cy + face_h / 2
        glow = ORANGE if self.mode == "speaking" else GREEN if self.mode == "listening" else CYAN

        self.create_rectangle(left - 10, top - 10, right + 10, bottom + 10, outline="#083746", width=1)
        self.create_polygon(
            left + face_w * 0.18,
            top,
            right - face_w * 0.18,
            top,
            right,
            top + face_h * 0.26,
            right - face_w * 0.08,
            bottom,
            left + face_w * 0.08,
            bottom,
            left,
            top + face_h * 0.26,
            outline=glow,
            fill="#031018",
            width=2,
        )
        self.create_line(left + face_w * 0.22, top - 14, right - face_w * 0.22, top - 14, fill=TEXT, width=3)
        self.create_line(left + face_w * 0.3, top - 28, left + face_w * 0.5, top - 14, fill=TEXT, width=4)
        self.create_line(right - face_w * 0.3, top - 28, right - face_w * 0.5, top - 14, fill=TEXT, width=4)

        blink = self.angle % 96 > 88
        look_x = self._sin(self.angle * 1.7) * face_w * 0.035
        look_y = self._cos(self.angle * 1.2) * face_h * 0.015
        eye_y = top + face_h * 0.38
        eye_w = face_w * 0.24
        eye_h = face_h * (0.035 if blink else 0.13)
        for eye_cx in (cx - face_w * 0.24, cx + face_w * 0.24):
            self.create_rectangle(
                eye_cx - eye_w / 2,
                eye_y - eye_h / 2,
                eye_cx + eye_w / 2,
                eye_y + eye_h / 2,
                outline=glow,
                width=2,
            )
            if not blink:
                pupil = eye_h * 0.28
                self.create_oval(
                    eye_cx + look_x - pupil,
                    eye_y + look_y - pupil,
                    eye_cx + look_x + pupil,
                    eye_y + look_y + pupil,
                    fill=glow,
                    outline="",
                )

        self.create_line(left + face_w * 0.44, eye_y + face_h * 0.12, cx, eye_y + face_h * 0.22, fill="#0f5362", width=2)
        self.create_line(right - face_w * 0.44, eye_y + face_h * 0.12, cx, eye_y + face_h * 0.22, fill="#0f5362", width=2)

        mouth_y = top + face_h * 0.74
        mouth_w = face_w * 0.48
        self.create_rectangle(cx - mouth_w / 2, mouth_y - 18, cx + mouth_w / 2, mouth_y + 18, outline=glow, width=2)
        bars = 7
        for i in range(bars):
            x = cx - mouth_w * 0.38 + i * (mouth_w * 0.76 / (bars - 1))
            if self.mode == "speaking":
                bar_h = 5 + ((self.angle + i * 13) % 18)
            elif active:
                bar_h = 6 + (i % 3) * 3
            else:
                bar_h = 5
            self.create_line(x, mouth_y - bar_h, x, mouth_y + bar_h, fill=glow, width=3)

        if self.mode == "thinking":
            self.create_text(cx, bottom + 28, text="ANALYZING INPUT...", fill=WARNING, font=("Consolas", 9, "bold"))
        elif self.mode == "speaking":
            self.create_text(cx, bottom + 28, text="VOICE OUTPUT ACTIVE", fill=ORANGE, font=("Consolas", 9, "bold"))

    def _waveform(self, cx: float, y: float, width: float) -> None:
        color = GREEN if self.mode == "listening" else ORANGE if self.mode == "speaking" else CYAN
        bars = 44
        start = cx - width / 2
        for i in range(bars):
            x = start + i * (width / bars)
            amp = 7 + ((i * 7 + self.angle) % 24 if self.mode in {"listening", "speaking"} else (i % 5) * 3)
            self.create_line(x, y - amp, x, y + amp, fill=color, width=3)

    def _hud(self, cx: float, cy: float, radius: float) -> None:
        label = {
            "idle": "STANDBY",
            "listening": "LISTENING",
            "thinking": "PROCESSING",
            "speaking": "RESPONDING",
        }.get(self.mode, "ONLINE")
        color = WARNING if self.mode == "thinking" else GREEN if self.mode == "listening" else TEXT
        self.create_text(cx, cy - radius - 62, text="J.A.R.V.I.S", fill=CYAN, font=("Consolas", 30, "bold"))
        self.create_text(cx, cy - radius - 30, text="IRON HUD VOICE INTERFACE", fill=MUTED, font=("Consolas", 10, "bold"))
        self.create_text(cx, cy + radius + 34, text=label, fill=color, font=("Consolas", 14, "bold"))

    @staticmethod
    def _sin(degrees: float) -> float:
        import math

        return math.sin(math.radians(degrees))

    @staticmethod
    def _cos(degrees: float) -> float:
        import math

        return math.cos(math.radians(degrees))


class JarvisApp(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.settings = get_settings()
        self.assistant = JarvisAssistant(self.settings)
        self.speaker = Speaker(
            self.settings.voice_rate,
            self.settings.voice_volume,
            self.settings.tts_provider,
            self.settings.edge_voice,
        )
        self.listener = SpeechListener(self.settings.language, self.settings.language_fallbacks)
        self.metrics = JarvisMetrics(
            self.settings.metrics_enabled,
            self.settings.metrics_host,
            self.settings.metrics_port,
        )
        self.events: queue.Queue[tuple[str, str]] = queue.Queue()
        self.stop_event = threading.Event()
        self.worker: threading.Thread | None = None
        self.command_worker: threading.Thread | None = None
        self.last_error_log = 0.0

        self.title(f"{self.settings.name} Desktop")
        self.geometry("1040x720")
        self.minsize(860, 620)
        self.configure(bg=BG)

        self._build_ui()
        self.metrics.start()
        self._poll_events()
        self._log("Jarvis tayyor.")
        if self.settings.metrics_enabled:
            self._log(f"Metrics: http://{self.settings.metrics_host}:{self.settings.metrics_port}/metrics")
        if not self.listener.available:
            self._log("Mikrofon moduli tayyor emas. install.ps1 ni ishga tushiring yoki text inputdan foydalaning.")

    def _build_ui(self) -> None:
        self.columnconfigure(0, weight=1)
        self.rowconfigure(0, weight=1)

        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure("Root.TFrame", background=BG)
        style.configure("Panel.TFrame", background=PANEL)
        style.configure("Soft.TFrame", background=PANEL_2)
        style.configure("Title.TLabel", background=BG, foreground=CYAN, font=("Consolas", 22, "bold"))
        style.configure("Meta.TLabel", background=BG, foreground=MUTED, font=("Consolas", 10))
        style.configure("Panel.TLabel", background=PANEL, foreground=TEXT, font=("Consolas", 10))
        style.configure("Accent.TButton", background="#093b55", foreground=TEXT, borderwidth=1, padding=(18, 9), font=("Consolas", 10, "bold"))
        style.configure("Ghost.TButton", background="#15222d", foreground=TEXT, borderwidth=1, padding=(18, 9), font=("Consolas", 10, "bold"))
        style.map("Accent.TButton", background=[("active", "#0f5b7d"), ("disabled", "#15222d")], foreground=[("disabled", "#637d86")])
        style.map("Ghost.TButton", background=[("active", "#223340"), ("disabled", "#15222d")], foreground=[("disabled", "#637d86")])

        root = ttk.Frame(self, style="Root.TFrame", padding=18)
        root.grid(row=0, column=0, sticky="nsew")
        root.columnconfigure(0, weight=1)
        root.rowconfigure(1, weight=1)
        root.rowconfigure(2, weight=0)

        header = ttk.Frame(root, style="Root.TFrame")
        header.grid(row=0, column=0, sticky="ew", pady=(0, 14))
        header.columnconfigure(1, weight=1)

        self.status_var = tk.StringVar(value="To'xtagan")
        badge = tk.Canvas(header, width=58, height=42, bg=BG, highlightthickness=0, bd=0)
        badge.grid(row=0, column=0, rowspan=2, sticky="w", padx=(0, 16))
        badge.create_oval(6, 4, 42, 40, outline=CYAN, width=2)
        badge.create_arc(2, 0, 50, 44, start=20, extent=120, outline=ORANGE, width=2, style="arc")
        badge.create_text(28, 21, text="AI", fill=TEXT, font=("Consolas", 10, "bold"))

        ttk.Label(header, text="J.A.R.V.I.S", style="Title.TLabel").grid(row=0, column=1, sticky="w")
        ttk.Label(
            header,
            text=f"IRON HUD CORE  |  WAKE: {self.settings.wake_word.upper()}  |  FAST LISTEN",
            style="Meta.TLabel",
        ).grid(row=1, column=1, sticky="w")
        ttk.Label(header, textvariable=self.status_var, style="Title.TLabel").grid(row=0, column=2, rowspan=2, sticky="e")

        cockpit = ttk.Frame(root, style="Root.TFrame")
        cockpit.grid(row=1, column=0, sticky="nsew")
        cockpit.rowconfigure(0, weight=1)
        cockpit.columnconfigure(0, weight=1)
        cockpit.columnconfigure(1, weight=3)
        cockpit.columnconfigure(2, weight=1)

        owner_panel = self._make_cockpit_panel(cockpit, "MUROD", "OWNER PROFILE")
        owner_panel.grid(row=0, column=0, sticky="nsew", padx=(0, 12))
        self._panel_line(owner_panel, "Identity", self.settings.owner_name)
        self._panel_line(owner_panel, "Voice access", "Armed")
        self._panel_line(owner_panel, "Mode", "Command + Chat")
        self._panel_line(owner_panel, "Wake", self.settings.wake_word.upper())

        main_panel = ttk.Frame(cockpit, style="Panel.TFrame", padding=14)
        main_panel.grid(row=0, column=1, sticky="nsew")
        main_panel.rowconfigure(0, weight=1)
        main_panel.columnconfigure(0, weight=1)

        self.visualizer = JarvisVisualizer(main_panel)
        self.visualizer.grid(row=0, column=0, sticky="nsew")

        ai_panel = self._make_cockpit_panel(cockpit, self.settings.name.upper(), "AI STATUS")
        ai_panel.grid(row=0, column=2, sticky="nsew", padx=(12, 0))
        self._panel_line(ai_panel, "Speech", "uz-UZ")
        self._panel_line(ai_panel, "TTS", self.settings.edge_voice)
        self._panel_line(ai_panel, "Metrics", f":{self.settings.metrics_port}")
        self._panel_line(ai_panel, "Model", self.settings.openai_model or "local")

        command_panel = ttk.Frame(root, style="Root.TFrame")
        command_panel.grid(row=2, column=0, sticky="ew", pady=(14, 0))
        command_panel.columnconfigure(0, weight=1)

        controls = ttk.Frame(command_panel, style="Root.TFrame")
        controls.grid(row=0, column=0, sticky="w", pady=(0, 10))

        self.start_button = ttk.Button(controls, text="START", style="Accent.TButton", command=self.start_listening)
        self.start_button.pack(side="left")
        self.stop_button = ttk.Button(controls, text="STOP", style="Ghost.TButton", command=self.stop_listening, state="disabled")
        self.stop_button.pack(side="left", padx=(8, 0))
        ttk.Label(command_panel, text="Conversation", style="Meta.TLabel").grid(row=0, column=0, sticky="e", pady=(8, 0))

        log_shell = ttk.Frame(command_panel, style="Soft.TFrame", padding=10)
        log_shell.grid(row=1, column=0, sticky="ew")
        log_shell.rowconfigure(0, weight=1)
        log_shell.columnconfigure(0, weight=1)

        self.log = tk.Text(
            log_shell,
            wrap="word",
            height=7,
            bg="#031018",
            fg=GREEN,
            insertbackground=CYAN,
            selectbackground="#0e3948",
            relief="flat",
            borderwidth=0,
            font=("Consolas", 10),
        )
        self.log.grid(row=0, column=0, sticky="nsew")
        scrollbar = ttk.Scrollbar(log_shell, command=self.log.yview)
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.log.configure(yscrollcommand=scrollbar.set)

        bottom = ttk.Frame(command_panel, style="Root.TFrame")
        bottom.grid(row=2, column=0, sticky="ew", pady=(10, 0))
        bottom.columnconfigure(0, weight=1)

        self.input_var = tk.StringVar()
        entry = tk.Entry(
            bottom,
            textvariable=self.input_var,
            bg="#031018",
            fg=TEXT,
            insertbackground=CYAN,
            relief="flat",
            font=("Consolas", 12),
        )
        entry.grid(row=0, column=0, sticky="ew")
        entry.bind("<Return>", lambda _event: self.submit_text())
        ttk.Button(bottom, text="SEND", style="Accent.TButton", command=self.submit_text).grid(row=0, column=1, padx=(8, 0))

    def _make_cockpit_panel(self, parent: tk.Misc, title: str, subtitle: str) -> ttk.Frame:
        panel = ttk.Frame(parent, style="Panel.TFrame", padding=14)
        panel.columnconfigure(0, weight=1)
        tk.Label(panel, text=title, bg=PANEL, fg=CYAN, font=("Consolas", 18, "bold")).grid(row=0, column=0, sticky="w")
        tk.Label(panel, text=subtitle, bg=PANEL, fg=MUTED, font=("Consolas", 9, "bold")).grid(row=1, column=0, sticky="w", pady=(0, 18))
        return panel

    def _panel_line(self, parent: ttk.Frame, label: str, value: str) -> None:
        row = len(parent.grid_slaves()) + 1
        frame = ttk.Frame(parent, style="Panel.TFrame")
        frame.grid(row=row, column=0, sticky="ew", pady=(0, 12))
        frame.columnconfigure(0, weight=1)
        tk.Label(frame, text=label.upper(), bg=PANEL, fg=MUTED, font=("Consolas", 8, "bold")).grid(row=0, column=0, sticky="w")
        tk.Label(frame, text=value, bg=PANEL, fg=TEXT, font=("Consolas", 10, "bold"), wraplength=150, justify="left").grid(row=1, column=0, sticky="w")

    def start_listening(self) -> None:
        if self.worker and self.worker.is_alive():
            return
        self.stop_event.clear()
        self.worker = threading.Thread(target=self._voice_loop, daemon=True)
        self.worker.start()
        self.status_var.set("Tinglayapman")
        self.metrics.set_state("listening")
        self.visualizer.set_mode("listening")
        self.start_button.configure(state="disabled")
        self.stop_button.configure(state="normal")
        self._log("Ovozli tinglash boshlandi.")

    def stop_listening(self) -> None:
        self.stop_event.set()
        self.status_var.set("To'xtatilmoqda")
        self.metrics.set_state("idle")
        self.visualizer.set_mode("idle")
        self.start_button.configure(state="normal")
        self.stop_button.configure(state="disabled")

    def submit_text(self) -> None:
        text = self.input_var.get().strip()
        if not text:
            return
        self.input_var.set("")
        self._handle_command(text)

    def _voice_loop(self) -> None:
        while not self.stop_event.is_set():
            self._post_event("status", "Wake word kutyapman")
            result = self.listener.listen_once()
            if self.stop_event.is_set():
                break
            if not result.ok:
                self.metrics.inc("speech_errors_total")
                now = time.monotonic()
                if now - self.last_error_log > 3:
                    self._post_event("log", result.message)
                    self.last_error_log = now
                time.sleep(0.35)
                continue

            heard = result.text
            self.metrics.inc("voice_heard_total")
            self._post_event("heard", heard)
            has_wake = self.assistant.has_wake_word(heard)
            if self.settings.require_wake_word and not has_wake and not self.assistant.looks_like_command(heard):
                continue

            command = self.assistant.strip_wake_word(heard)
            if self.settings.require_wake_word and has_wake and not command:
                self._post_event("status", "Buyruq kutyapman")
                self.speaker.say_async("Ha, eshitdim.")
                result = self.listener.listen_once()
                if not result.ok:
                    self.metrics.inc("speech_errors_total")
                    self._post_event("log", result.message)
                    continue
                command = result.text
                self.metrics.inc("voice_heard_total")
                self._post_event("heard", command)

            self._post_event("ack", "Buyruq qabul qilindi.")
            self._post_event("command", command)

        self._post_event("status", "To'xtagan")

    def _handle_command(self, text: str) -> None:
        self.metrics.inc("commands_total")
        self.metrics.set_state("thinking")
        self.visualizer.set_mode("thinking")
        self._log(f"Siz: {text}")
        self.status_var.set("Buyruq bajarilmoqda")
        self.command_worker = threading.Thread(target=self._run_command, args=(text,), daemon=True)
        self.command_worker.start()

    def _run_command(self, text: str) -> None:
        start = time.monotonic()
        try:
            response = self.assistant.handle(text)
        except Exception as exc:
            response = f"Buyruq bajarishda xato: {exc}"
        self.metrics.observe_response(time.monotonic() - start)
        self._post_event("response", response)

    def _speak_response(self, response: str) -> None:
        self.metrics.inc("responses_total")
        self.metrics.inc("tts_requests_total")
        self.metrics.set_state("speaking")
        self.visualizer.set_mode("speaking")
        self._log(f"{self.settings.name}: {response}")
        self.speaker.say_async(response)
        speak_ms = max(1800, min(8500, len(response) * 55))
        self.after(speak_ms, self._restore_visual_state)
        self.status_var.set("Tinglayapman" if self.worker and self.worker.is_alive() else "Tayyor")

    def _restore_visual_state(self) -> None:
        state = "listening" if self.worker and self.worker.is_alive() else "idle"
        self.metrics.set_state(state)
        self.visualizer.set_mode(state)

    def _poll_events(self) -> None:
        processed = 0
        try:
            while processed < 8:
                kind, value = self.events.get_nowait()
                processed += 1
                if kind == "status":
                    self.status_var.set(value)
                    if "Wake" in value or "Buyruq" in value or "Ting" in value:
                        self.metrics.set_state("listening")
                        self.visualizer.set_mode("listening")
                    elif "To'xtagan" in value:
                        self.metrics.set_state("idle")
                        self.visualizer.set_mode("idle")
                elif kind == "heard":
                    self._log(f"Eshitildi: {value}")
                elif kind == "ack":
                    self._log(value)
                    self.speaker.say_async(value)
                elif kind == "command":
                    self._handle_command(value)
                elif kind == "response":
                    self._speak_response(value)
                else:
                    self._log(value)
        except queue.Empty:
            pass
        self.after(80 if processed else 160, self._poll_events)

    def _log(self, text: str) -> None:
        self.log.insert("end", text + "\n")
        line_count = int(self.log.index("end-1c").split(".")[0])
        if line_count > 220:
            self.log.delete("1.0", "60.0")
        self.log.see("end")

    def _post_event(self, kind: str, value: str) -> None:
        if self.events.qsize() > 80 and kind in {"status", "log"}:
            return
        self.events.put((kind, value))


def main() -> None:
    app = JarvisApp()
    app.mainloop()
