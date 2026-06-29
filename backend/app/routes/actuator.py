from fastapi import APIRouter
from ..schemas import ActuatorCommand
from ..crud import ActuatorCRUD

router = APIRouter()


@router.post("/actuator/{actuator_type}")
def set_actuator(actuator_type: str, cmd: ActuatorCommand):
    return ActuatorCRUD.set_state(actuator_type, cmd.state)


@router.get("/actuator/{actuator_type}/state")
def get_actuator(actuator_type: str):
    return ActuatorCRUD.get_state(actuator_type)
