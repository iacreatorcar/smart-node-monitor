from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SensorData(BaseModel):
    id: Optional[int] = None
    device_id: str = "node-001"
    temperature: float
    humidity: Optional[float] = None
    timestamp: Optional[str] = None


class ActuatorState(BaseModel):
    id: Optional[int] = None
    actuator_type: str
    state: bool = False
    updated_at: Optional[str] = None
