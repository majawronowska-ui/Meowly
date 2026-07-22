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

    html = f"""
    <div style="margin:0; padding:0; background:#fff7ed; font-family:Arial, sans-serif;">
      <div style="max-width:680px; margin:0 auto; padding:40px 18px;">

        <div style="text-align:center; margin-bottom:24px;">
          <div style="font-size:44px; font-weight:900; color:#3b2f2f;">
            🐾 Meowly
          </div>
          <p style="margin:8px 0 0; color:#8a6a55; font-size:16px; font-weight:700;">
            Pomagaj kotom w swojej okolicy
          </p>
        </div>

        <div style="
          background:#ffffff;
          border:1px solid #fed7aa;
          border-radius:32px;
          padding:34px 24px;
          text-align:center;
          box-shadow:0 18px 45px rgba(249,115,22,0.14);
        ">

          <div style="
            width:150px;
            height:150px;
            margin:0 auto 18px;
            border-radius:50%;
            background:#ffedd5;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:78px;
          ">
            🐱
          </div>

          <h1 style="margin:0; color:#2f2623; font-size:36px; line-height:1.15;">
            Cześć!
          </h1>

          <p style="margin:20px auto 0; max-width:500px; color:#5f514a; font-size:18px; line-height:1.7;">
            Dziękujemy, że dołączyłaś/eś do społeczności
            <strong style="color:#f97316;">Meowly</strong>.
          </p>

          <p style="margin:18px auto 0; max-width:500px; color:#5f514a; font-size:17px; line-height:1.7;">
            Potwierdź swój adres e-mail, klikając w przycisk poniżej:
          </p>

          <div style="height:34px;"></div>

          <a href="{verify_link}" style="
            display:inline-block;
            background:linear-gradient(135deg,#fb923c,#f97316);
            color:#ffffff;
            text-decoration:none;
            font-size:20px;
            font-weight:900;
            padding:18px 42px;
            border-radius:18px;
            box-shadow:0 10px 22px rgba(249,115,22,0.28);
          ">
            Potwierdź e-mail 🐾
          </a>

          <div style="height:34px;"></div>

          <div style="width:80%; height:1px; background:#fed7aa; margin:0 auto;"></div>

          <p style="margin:28px auto 0; max-width:500px; color:#8a7a70; font-size:14px; line-height:1.7;">
            Jeśli nie zakładałaś/eś konta w Meowly, możesz zignorować tę wiadomość.
          </p>

          <p style="margin:14px 0 0; color:#f97316; font-size:18px; font-weight:900;">
            Zespół Meowly ❤
          </p>
        </div>

        <div style="
          margin-top:24px;
          background:#fff1e6;
          border-radius:24px;
          padding:20px;
          text-align:center;
          color:#8a6a55;
          font-size:14px;
          font-weight:700;
        ">
          🐱 Meowly — razem zmieniamy los kotów
          <br />
          <span style="font-weight:400;">© 2026 Meowly. Wszelkie prawa zastrzeżone.</span>
        </div>

      </div>
    </div>
    """

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Potwierdź konto w Meowly 🐾",
        "html": html,
    })