import os
import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Meowly <onboarding@resend.dev>")
BACKEND_URL = os.getenv("BACKEND_URL", "https://meowly.onrender.com")

# Ustaw klucz tylko jeśli istnieje
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
else:
    print("⚠️ RESEND_API_KEY nie jest ustawiony. Wysyłanie maili będzie wyłączone.")


def send_verification_email(to_email: str, token: str):
    if not RESEND_API_KEY:
        raise Exception("Brakuje RESEND_API_KEY.")

    verify_link = f"{BACKEND_URL}/verify/{token}"

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Potwierdź konto w Meowly",
        "html": f"""
        <h2>🐾 Witaj w Meowly!</h2>
        <p>Dziękujemy za rejestrację.</p>
        <p>Kliknij przycisk poniżej, aby aktywować konto.</p>

        <a href="{verify_link}"
           style="background:#f97316;
                  color:white;
                  padding:14px 24px;
                  text-decoration:none;
                  border-radius:12px;">
            Potwierdź konto
        </a>
        """
    })