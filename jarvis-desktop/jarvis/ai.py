from __future__ import annotations

from .config import Settings


SYSTEM_PROMPT = """
You are {assistant_name}, a personal Jarvis-style desktop assistant for {owner_name}.
Speak in natural Uzbek Latin by default.
Sound like a calm, capable assistant, not a formal chatbot.
Keep most spoken answers short: 1 to 3 sentences.
When the user asks for planning, coding, learning, or troubleshooting, be practical and direct.
Call the user "{owner_name}" sometimes, but not in every sentence.
Never pretend you can see, hear, or control something unless the app context or tools actually provide it.
"""


class AIClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.available = False
        self.reason = ""
        self._client = None
        self._history: list[dict[str, str]] = []

        if not settings.openai_api_key:
            self.reason = "OPENAI_API_KEY is not configured."
            return

        try:
            from openai import OpenAI  # type: ignore

            self._client = OpenAI(api_key=settings.openai_api_key)
            self.available = True
        except Exception as exc:
            self.reason = str(exc)

    def ask(self, prompt: str) -> str:
        if not self.available or self._client is None:
            return (
                f"{self.settings.owner_name}, odamdek suhbat qilishim uchun .env faylida "
                "OPENAI_API_KEY kerak. Hozircha lokal buyruqlarni bajara olaman."
            )

        model = self.settings.openai_model or "gpt-4o-mini"
        system_prompt = SYSTEM_PROMPT.format(
            assistant_name=self.settings.name,
            owner_name=self.settings.owner_name,
        ).strip()
        messages = [
            {"role": "system", "content": system_prompt},
            *self._history[-self.settings.chat_history * 2 :],
            {"role": "user", "content": prompt},
        ]
        try:
            completion = self._client.chat.completions.create(
                model=model,
                messages=messages,
            )
            answer = completion.choices[0].message.content.strip()
            self._remember(prompt, answer)
            return answer
        except Exception as exc:
            return f"AI javobida xato: {exc}"

    def _remember(self, user_text: str, assistant_text: str) -> None:
        self._history.append({"role": "user", "content": user_text})
        self._history.append({"role": "assistant", "content": assistant_text})
        max_items = max(self.settings.chat_history * 2, 2)
        if len(self._history) > max_items:
            self._history = self._history[-max_items:]
