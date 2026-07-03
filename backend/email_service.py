import os
import resend
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Meowly <onboarding@resend.dev>")
BACKEND_URL = os.getenv("BACKEND_URL", "https://meowly.onrender.com")

if not RESEND_API_KEY:
    raise Exception("Brakuje RESEND_API_KEY w zmiennych środowiskowych.")

resend.api_key = RESEND_API_KEY


def send_verification_email(to_email: str, token: str):
    verify_link = f"{BACKEND_URL}/verify/{token}"

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Potwierdź konto w Meowly",
        "html": f"""
        <div style="font-family: Arial; padding: 24px;">
            <h1>🐾 Witaj w Meowly!</h1>
            <p>Dziękujemy za rejestrację.</p>
            <p>Kliknij poniżej, aby potwierdzić konto:</p>

            <a href="{verify_link}" style="
                display:inline-block;
                background:#f97316;
                color:white;
                padding:14px 22px;
                border-radius:14px;
                text-decoration:none;
                font-weight:bold;
            ">
                Potwierdź konto
            </a>
        </div>
        """
    })