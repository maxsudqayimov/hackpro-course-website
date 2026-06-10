from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT_DIR / "data"


def load_dotenv(path: Path | None = None) -> None:
    env_path = path or ROOT_DIR / ".env"
    if not env_path.exists():
        return

    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def env_bool(name: str, default: bool) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.lower() in {"1", "true", "yes", "y", "on"}


def env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


@dataclass(frozen=True)
class Settings:
    name: str
    owner_name: str
    wake_word: str
    wake_aliases: tuple[str, ...]
    language: str
    language_fallbacks: tuple[str, ...]
    require_wake_word: bool
    metrics_enabled: bool
    metrics_host: str
    metrics_port: int
    tts_provider: str
    edge_voice: str
    voice_rate: int
    voice_volume: int
    chat_history: int
    openai_api_key: str
    openai_model: str


def get_settings() -> Settings:
    load_dotenv()
    DATA_DIR.mkdir(exist_ok=True)
    wake_word = os.getenv("JARVIS_WAKE_WORD", "jarvis").lower()
    wake_aliases = tuple(
        alias.strip().lower()
        for alias in os.getenv("JARVIS_WAKE_ALIASES", f"{wake_word},jervis").split(",")
        if alias.strip()
    )
    if wake_word == "jarvis":
        wake_aliases = tuple(
            dict.fromkeys(
                (
                    *wake_aliases,
                    "djarvis",
                    "javis",
                    "\u0436\u0430\u0440\u0432\u0438\u0441",
                    "\u0434\u0436\u0430\u0440\u0432\u0438\u0441",
                    "\u0436\u0435\u0440\u0432\u0438\u0441",
                )
            )
        )
    language = os.getenv("JARVIS_LANGUAGE", "uz-UZ")
    language_fallbacks = tuple(
        item.strip()
        for item in os.getenv("JARVIS_LANGUAGE_FALLBACKS", language).split(",")
        if item.strip()
    )
    return Settings(
        name=os.getenv("JARVIS_NAME", "Jarvisbek"),
        owner_name=os.getenv("JARVIS_OWNER_NAME", "Murod"),
        wake_word=wake_word,
        wake_aliases=wake_aliases,
        language=language,
        language_fallbacks=language_fallbacks,
        require_wake_word=env_bool("JARVIS_REQUIRE_WAKE_WORD", True),
        metrics_enabled=env_bool("JARVIS_METRICS_ENABLED", True),
        metrics_host=os.getenv("JARVIS_METRICS_HOST", "127.0.0.1"),
        metrics_port=env_int("JARVIS_METRICS_PORT", 8765),
        tts_provider=os.getenv("JARVIS_TTS_PROVIDER", "edge").lower(),
        edge_voice=os.getenv("JARVIS_EDGE_VOICE", "uz-UZ-SardorNeural"),
        voice_rate=env_int("JARVIS_VOICE_RATE", 0),
        voice_volume=max(0, min(env_int("JARVIS_VOICE_VOLUME", 90), 100)),
        chat_history=max(0, min(env_int("JARVIS_CHAT_HISTORY", 8), 20)),
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
        openai_model=os.getenv("OPENAI_MODEL", ""),
    )
