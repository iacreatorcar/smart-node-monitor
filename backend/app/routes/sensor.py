from fastapi import APIRouter
from ..schemas import SensorDataCreate
from ..crud import SensorCRUD

router = APIRouter()


@router.post("/sensor-data")
def post_sensor_data(data: SensorDataCreate):
    return SensorCRUD.create(data)


@router.get("/sensor-data/latest")
def get_latest(device_id: str = "node-001"):
    return SensorCRUD.get_latest(device_id)


@router.get("/sensor-data/history")
def get_history(limit: int = 50, hours: int = 24):
    return SensorCRUD.get_history(limit, hours)
