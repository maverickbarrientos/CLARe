from pydantic import BaseModel
import enum

class QRCodeStatus(enum.Enum):
    valid = "valid"
    invalid = "invalid"