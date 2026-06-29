from sqlalchemy import Column, Integer, Float, DateTime, String, Boolean
from datetime import datetime
from .database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"
    
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(50), default="node-001")
    temperature = Column(Float)
    humidity = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

class ActuatorState(Base):
    __tablename__ = "actuator_states"
    
    id = Column(Integer, primary_key=True, index=True)
    actuator_type = Column(String(20))  # 'led' o 'buzzer'
    state = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)