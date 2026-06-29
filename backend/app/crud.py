from .database import get_db
from .schemas import SensorDataCreate, ActuatorUpdate
from datetime import datetime, timedelta
from typing import List, Dict

db = get_db()

class SensorCRUD:
    @staticmethod
    def create_sensor_data(data: SensorDataCreate):
        """Inserisce nuovi dati sensore"""
        result = db.table('sensor_data').insert({
            'device_id': data.device_id,
            'temperature': data.temperature,
            'humidity': data.humidity,
            'timestamp': data.timestamp or datetime.utcnow().isoformat()
        }).execute()
        return result.data[0] if result.data else None
    
    @staticmethod
    def get_latest(device_id: str = "node-001"):
        """Recupera ultima lettura"""
        result = db.table('sensor_data')\
            .select('*')\
            .eq('device_id', device_id)\
            .order('timestamp', desc=True)\
            .limit(1)\
            .execute()
        return result.data[0] if result.data else None
    
    @staticmethod
    def get_history(limit: int = 100, hours: int = 24):
        """Recupera storico ultime ore"""
        since = (datetime.utcnow() - timedelta(hours=hours)).isoformat()
        result = db.table('sensor_data')\
            .select('*')\
            .gte('timestamp', since)\
            .order('timestamp', desc=False)\
            .limit(limit)\
            .execute()
        return result.data

class ActuatorCRUD:
    @staticmethod
    def get_state(actuator_type: str):
        """Recupera stato attuatore"""
        result = db.table('actuator_states')\
            .select('*')\
            .eq('actuator_type', actuator_type)\
            .limit(1)\
            .execute()
        return result.data[0] if result.data else None
    
    @staticmethod
    def update_state(actuator_type: str, state: bool):
        """Aggiorna stato attuatore"""
        result = db.table('actuator_states')\
            .upsert({
                'actuator_type': actuator_type,
                'state': state,
                'updated_at': datetime.utcnow().isoformat()
            }, on_conflict='actuator_type')\
            .execute()
        return result.data[0] if result.data else None