from __future__ import annotations

import json
import platform
import subprocess
import webbrowser
from datetime import datetime
from pathlib import Path
from urllib.parse import quote_plus

from .config import DATA_DIR


NOTES_FILE = DATA_DIR / "notes.json"

APP_COMMANDS = {
    "notepad": "notepad.exe",
    "bloknot": "notepad.exe",
    "calculator": "calc.exe",
    "kalkulyator": "calc.exe",
    "paint": "mspaint.exe",
    "cmd": "cmd.exe",
    "terminal": "wt.exe",
    "explorer": "explorer.exe",
}

WEBSITES = {
    "google": "https://www.google.com",
    "youtube": "https://www.youtube.com",
    "wikipedia": "https://www.wikipedia.org",
    "github": "https://github.com",
    "gmail": "https://mail.google.com",
}


def open_app(name: str) -> str:
    key = name.strip().lower()
    command = APP_COMMANDS.get(key)
    if command is None:
        return f"{name} uchun tayyor buyruq topilmadi."
    try:
        subprocess.Popen([command], shell=False)
        return f"{name} ochildi."
    except Exception as exc:
        return f"{name} ochishda xato: {exc}"


def open_website(name: str) -> str:
    key = name.strip().lower()
    url = WEBSITES.get(key)
    if url is None:
        url = name if name.startswith(("http://", "https://")) else f"https://{name}"
    webbrowser.open(url)
    return f"{name} ochildi."


def search_google(query: str) -> str:
    webbrowser.open(f"https://www.google.com/search?q={quote_plus(query)}")
    return f"Google'da qidiryapman: {query}"


def search_youtube(query: str) -> str:
    webbrowser.open(f"https://www.youtube.com/results?search_query={quote_plus(query)}")
    return f"YouTube'da qidiryapman: {query}"


def current_time() -> str:
    return datetime.now().strftime("Hozir soat %H:%M.")


def current_date() -> str:
    return datetime.now().strftime("Bugun sana %d.%m.%Y.")


def system_info() -> str:
    return (
        f"Tizim: {platform.system()} {platform.release()}. "
        f"Kompyuter: {platform.node()}. "
        f"Python: {platform.python_version()}."
    )


def save_note(text: str) -> str:
    notes = load_notes()
    notes.append({"created_at": datetime.now().isoformat(timespec="seconds"), "text": text})
    NOTES_FILE.write_text(json.dumps(notes, ensure_ascii=False, indent=2), encoding="utf-8")
    return "Eslatma saqlandi."


def load_notes() -> list[dict[str, str]]:
    if not NOTES_FILE.exists():
        return []
    try:
        return json.loads(NOTES_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []


def read_notes() -> str:
    notes = load_notes()
    if not notes:
        return "Hozircha eslatmalar yo'q."
    last_notes = notes[-5:]
    return "Oxirgi eslatmalar: " + "; ".join(note["text"] for note in last_notes)


def take_screenshot() -> str:
    try:
        import pyautogui  # type: ignore
    except Exception:
        return "Skrinshot uchun pyautogui o'rnatilmagan."

    screenshots_dir = DATA_DIR / "screenshots"
    screenshots_dir.mkdir(exist_ok=True)
    path = screenshots_dir / f"screenshot-{datetime.now().strftime('%Y%m%d-%H%M%S')}.png"
    image = pyautogui.screenshot()
    image.save(path)
    return f"Skrinshot saqlandi: {path}"
