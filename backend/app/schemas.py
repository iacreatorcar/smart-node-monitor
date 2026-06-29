from pydantic import BaseModel
from typing import Optional


class SensorDataCreate(BaseModel):
    device_id: str = "node-001"
    temperature: float
    humidity: Optional[float] = None
    timestamp: Optional[str] = None


class ActuatorCommand(BaseModel):
    state: bool
