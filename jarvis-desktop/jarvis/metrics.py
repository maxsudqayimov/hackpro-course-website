from __future__ import annotations

import platform
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class JarvisMetrics:
    def __init__(self, enabled: bool = True, host: str = "127.0.0.1", port: int = 8765) -> None:
        self.enabled = enabled
        self.host = host
        self.port = port
        self.started_at = time.time()
        self._lock = threading.Lock()
        self._server: ThreadingHTTPServer | None = None
        self._thread: threading.Thread | None = None
        self.state = "idle"
        self.counters: dict[str, int] = {
            "commands_total": 0,
            "voice_heard_total": 0,
            "speech_errors_total": 0,
            "responses_total": 0,
            "tts_requests_total": 0,
        }
        self.response_duration_sum = 0.0
        self.response_duration_count = 0

    def start(self) -> None:
        if not self.enabled or self._server is not None:
            return

        metrics = self

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self) -> None:  # noqa: N802
                if self.path == "/health":
                    self._write_text("ok\n")
                    return
                if self.path != "/metrics":
                    self.send_response(404)
                    self.end_headers()
                    return
                self._write_text(metrics.render())

            def log_message(self, _format: str, *_args: object) -> None:
                return

            def _write_text(self, body: str) -> None:
                data = body.encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

        try:
            self._server = ThreadingHTTPServer((self.host, self.port), Handler)
        except OSError:
            return

        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()

    def stop(self) -> None:
        if self._server is None:
            return
        self._server.shutdown()
        self._server.server_close()
        self._server = None

    def set_state(self, state: str) -> None:
        with self._lock:
            self.state = state

    def inc(self, name: str, amount: int = 1) -> None:
        with self._lock:
            self.counters[name] = self.counters.get(name, 0) + amount

    def observe_response(self, duration_seconds: float) -> None:
        with self._lock:
            self.response_duration_sum += max(duration_seconds, 0)
            self.response_duration_count += 1

    def render(self) -> str:
        with self._lock:
            counters = dict(self.counters)
            state = self.state
            duration_sum = self.response_duration_sum
            duration_count = self.response_duration_count

        uptime = time.time() - self.started_at
        state_values = {
            "idle": 1 if state == "idle" else 0,
            "listening": 1 if state == "listening" else 0,
            "thinking": 1 if state == "thinking" else 0,
            "speaking": 1 if state == "speaking" else 0,
        }
        lines = [
            "# HELP jarvis_up Whether Jarvis metrics endpoint is alive.",
            "# TYPE jarvis_up gauge",
            "jarvis_up 1",
            "# HELP jarvis_uptime_seconds Jarvis process uptime in seconds.",
            "# TYPE jarvis_uptime_seconds gauge",
            f"jarvis_uptime_seconds {uptime:.3f}",
            '# HELP jarvis_info Static Jarvis runtime info.',
            '# TYPE jarvis_info gauge',
            f'jarvis_info{{system="{platform.system()}",release="{platform.release()}",python="{platform.python_version()}"}} 1',
            "# HELP jarvis_state Current Jarvis UI/listening state.",
            "# TYPE jarvis_state gauge",
        ]
        for name, value in state_values.items():
            lines.append(f'jarvis_state{{state="{name}"}} {value}')
        for name, value in counters.items():
            lines.extend(
                [
                    f"# HELP jarvis_{name} Jarvis {name.replace('_', ' ')}.",
                    f"# TYPE jarvis_{name} counter",
                    f"jarvis_{name} {value}",
                ]
            )
        lines.extend(
            [
                "# HELP jarvis_response_duration_seconds_sum Total response generation time.",
                "# TYPE jarvis_response_duration_seconds_sum counter",
                f"jarvis_response_duration_seconds_sum {duration_sum:.6f}",
                "# HELP jarvis_response_duration_seconds_count Response duration sample count.",
                "# TYPE jarvis_response_duration_seconds_count counter",
                f"jarvis_response_duration_seconds_count {duration_count}",
            ]
        )
        return "\n".join(lines) + "\n"
