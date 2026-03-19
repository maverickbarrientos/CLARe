from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List

import os

load_dotenv()

HOST = os.getenv("MAIL_HOST")
USERNAME = os.getenv("MAIL_USERNAME")
PASSWORD = os.getenv("MAIL_PASSWORD")
PORT = int(os.getenv("MAIL_PORT"))

class MailBody(BaseModel):
    to: list[str]
    subject: str
    body: str
    template: str | None = None  # ← make optional
    context: dict | None = None