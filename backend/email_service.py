import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "Meowly <onboarding@resend.dev>")


def send_verification_email(to_email: str, token: str):
    verify_link = f"http://127.0.0.1:8000/verify/{token}"
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Potwierdź konto Meowly",
        "html": f"""
        <div style="font-family: Arial; padding: 24px;">
            <h1>🐾 Witaj w Meowly!</h1>
            <p>Kliknij poniżej, aby potwierdzić swoje konto.</p>
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