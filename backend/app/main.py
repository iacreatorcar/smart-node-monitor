from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import sensor, actuator

app = FastAPI(title="Smart Node Monitor", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor.router, prefix="/api")
app.include_router(actuator.router, prefix="/api")


@app.get("/")
def root():
    return {"status": "ok", "service": "Smart Node Monitor"}


@app.get("/health")
def health():
    return {"status": "healthy"}
