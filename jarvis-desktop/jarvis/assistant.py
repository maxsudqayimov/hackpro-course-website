from __future__ import annotations

from difflib import SequenceMatcher
import re

from . import actions
from .ai import AIClient
from .config import Settings


COMMAND_HINTS = {
    "buyruq",
    "buyruqlar",
    "nima",
    "qila",
    "olasan",
    "yordam",
    "help",
    "soat",
    "vaqt",
    "sana",
    "bugun",
    "tizim",
    "notepad",
    "bloknot",
    "calculator",
    "kalkulyator",
    "kal",
    "paint",
    "terminal",
    "explorer",
    "youtube",
    "google",
    "qidir",
    "izla",
    "och",
    "eslatma",
    "skrinshot",
    "salom",
    "rahmat",
    "qalesan",
    "kimsan",
    "jarvisbek",
}


class JarvisAssistant:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.ai = AIClient(settings)

    def strip_wake_word(self, text: str) -> str:
        cleaned = text.strip()
        lower = cleaned.lower()
        for wake in self.settings.wake_aliases:
            if re.match(rf"^{re.escape(wake)}\b", lower):
                return cleaned[len(wake) :].strip(" ,.:;!-")
        return cleaned

    def has_wake_word(self, text: str) -> bool:
        lower = text.lower()
        words = self._words(lower)
        return any(
            re.search(rf"\b{re.escape(wake)}\b", lower) or self._fuzzy_contains(words, wake, 0.72)
            for wake in self.settings.wake_aliases
        )

    def looks_like_command(self, text: str) -> bool:
        lower = self._normalize(text)
        words = self._words(lower)
        return any(hint in lower for hint in COMMAND_HINTS) or any(
            self._fuzzy_contains(words, hint, 0.78) for hint in COMMAND_HINTS
        )

    def handle(self, raw_text: str) -> str:
        text = self.strip_wake_word(raw_text)
        lower = self._normalize(text)
        if not lower:
            return "Ha, eshitdim. Buyruq bering."

        if self._has_any(lower, ["buyruqlar", "buyruq", "nima qila olasan", "yordam", "help", "commands"]):
            return self.command_help()

        if self._has_any(lower, ["sen kimsan", "kimsan", "jarvisbek"]):
            return (
                f"Men {self.settings.name}man, {self.settings.owner_name}. "
                "Sizning shaxsiy ovozli yordamchingizman. Buyruq bersangiz bajaraman, "
                "API kalit qo'yilsa odamdek suhbat ham qilaman."
            )

        if self._has_any(lower, ["soat", "vaqt", "time"]):
            return actions.current_time()

        if self._has_any(lower, ["sana", "bugun", "date"]):
            return actions.current_date()

        if self._has_any(lower, ["tizim", "system", "kompyuter haqida"]):
            return actions.system_info()

        app_name = self._detect_app(lower)
        if app_name:
            return actions.open_app(app_name)

        for website in actions.WEBSITES:
            if website in lower and self._has_any(lower, ["och", "open", "kir"]):
                return actions.open_website(website)

        if lower.startswith(("open ", "och ")):
            target = re.sub(r"^(open|och)\s+", "", lower).strip()
            if target in actions.APP_COMMANDS:
                return actions.open_app(target)
            return actions.open_website(target)

        if "youtube" in lower and self._has_any(lower, ["qidir", "search", "izla"]):
            query = self._after_keywords(text, ["qidir", "search", "izla", "youtube"])
            return actions.search_youtube(query or text)

        if self._has_any(lower, ["google qidir", "qidir", "search", "izla"]):
            query = self._after_keywords(text, ["google qidir", "qidir", "search", "izla"])
            return actions.search_google(query or text)

        if lower.startswith(("eslatma ", "note ")):
            note = re.sub(r"^(eslatma|note)\s+", "", text, flags=re.IGNORECASE).strip()
            return actions.save_note(note) if note else "Eslatma matnini ayting."

        if self._has_any(lower, ["eslatmalar", "notes", "o'qib ber", "oqib ber"]):
            return actions.read_notes()

        if self._has_any(lower, ["skrinshot", "screenshot"]):
            return actions.take_screenshot()

        if self._has_any(lower, ["rahmat", "tashakkur"]):
            return f"Arzimaydi, {self.settings.owner_name}. Yana nima qilamiz?"

        if self._has_any(lower, ["qalesan", "qalaysan", "ahvoling"]):
            return f"Yaxshiman, {self.settings.owner_name}. Tizim tayyor, ovoz moduli faol."

        if self._has_any(lower, ["salom", "assalomu"]):
            return f"Assalomu alaykum, {self.settings.owner_name}. Men tayyorman."

        return self.ai.ask(text)

    def command_help(self) -> str:
        return (
            f"{self.settings.owner_name}, men hozircha quyidagilarni qila olaman: vaqt va sanani aytaman, "
            "notepad, calculator, paint, terminal va explorer ochaman, "
            "Google yoki YouTube'da qidiraman, sayt ochaman, tizim ma'lumotini aytaman, "
            "eslatma saqlayman va o'qib beraman, skrinshot olaman. "
            "API kalit qo'ysangiz odamdek suhbat ham qilaman. "
            "Masalan: Jarvis, google qidir Python darslari."
        )

    @staticmethod
    def _after_keywords(text: str, keywords: list[str]) -> str:
        lower = text.lower()
        for keyword in keywords:
            index = lower.find(keyword)
            if index >= 0:
                return text[index + len(keyword) :].strip(" ,.:;!-")
        return ""

    @staticmethod
    def _normalize(text: str) -> str:
        lower = text.lower().strip()
        replacements = {
            "калкулятор": "kalkulyator",
            "калькулятор": "kalkulyator",
            "blok nat": "bloknot",
            "kal kulyator": "kalkulyator",
            "ютуб": "youtube",
            "гугл": "google",
        }
        for old, new in replacements.items():
            lower = lower.replace(old, new)
        return lower

    @staticmethod
    def _words(text: str) -> list[str]:
        return re.findall(r"[\w']+", text.lower(), flags=re.UNICODE)

    def _has_any(self, text: str, phrases: list[str]) -> bool:
        words = self._words(text)
        return any(phrase in text or self._fuzzy_contains(words, phrase, 0.8) for phrase in phrases)

    @staticmethod
    def _fuzzy_contains(words: list[str], target: str, threshold: float) -> bool:
        target_words = target.split()
        if len(target_words) > 1:
            joined = " ".join(words)
            return SequenceMatcher(None, joined, target).ratio() >= threshold or target in joined
        return any(SequenceMatcher(None, word, target).ratio() >= threshold for word in words)

    def _detect_app(self, text: str) -> str:
        app_aliases = {
            "notepad": ["notepad", "bloknot", "blok nat", "блокнот"],
            "calculator": ["calculator", "kalkulyator", "kal kulyator", "калькулятор"],
            "paint": ["paint", "peynt"],
            "cmd": ["cmd", "komand", "command"],
            "terminal": ["terminal", "termin al"],
            "explorer": ["explorer", "papka", "folder"],
        }
        words = self._words(text)
        for app, aliases in app_aliases.items():
            if any(alias in text or self._fuzzy_contains(words, alias, 0.78) for alias in aliases):
                return app
        return ""
