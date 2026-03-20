import aiosmtplib
from ssl import create_default_context
from jinja2 import Template
from email.mime.text import MIMEText
from smtplib import SMTP

from config.mailer_config import HOST, PORT, USERNAME, PASSWORD, MailBody

class MailerService():
        
    def _render_template(self, template_path: str, context: dict) -> str:
        from datetime import datetime

        def fmt_date(dt):
            if isinstance(dt, str):
                dt = datetime.fromisoformat(dt.replace(" ", "T"))
            return dt.strftime("%B %d, %Y")

        def fmt_time(dt):
            if isinstance(dt, str):
                dt = datetime.fromisoformat(dt.replace(" ", "T"))
            return dt.strftime("%I:%M %p")

        for key in ("start_date", "end_date"):
            if key in context and context[key]:
                context[f"{key}_formatted"] = fmt_date(context[key])
                context[f"{key}_time"] = fmt_time(context[key])

        with open(template_path, "r", encoding="utf-8") as f:
            html_string = f.read()

        return Template(html_string).render(**context)
    
    async def send_email(self, data: dict | None = None):
        if "template" in data and "context" in data:
            data["body"] = self._render_template(data.pop("template"), data.pop("context"))

        msg = MailBody(**data)
        message = MIMEText(msg.body, "html", "utf-8")
        message["From"] = "CLARe - CITE Lab Reservation"
        message["To"] = ", ".join(msg.to) if isinstance(msg.to, list) else msg.to
        message["Subject"] = msg.subject

        ctx = create_default_context()

        try:
            await aiosmtplib.send(
                message,
                hostname=HOST,
                port=PORT,
                username=USERNAME,
                password=PASSWORD,
                start_tls=True,
            )
            print(f"Email sent to {message['To']} | Subject: {message['Subject']}")
            return {"status": 200, "errors": None}
        except Exception as e:
            return {"status": 500, "errors": str(e)}