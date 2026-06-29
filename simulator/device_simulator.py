import random
import time
import requests
import json
from datetime import datetime

class DeviceSimulator:
    def __init__(self, api_url="http://localhost:8000/api"):
        self.api_url = api_url
        self.device_id = "node-001"
        self.led_state = False
        
    def read_sensors(self):
        """Simula lettura sensori"""
        return {
            "temperature": round(random.uniform(18.0, 42.0), 1),
            "humidity": round(random.uniform(30.0, 80.0), 1)
        }
    
    def send_data(self):
        """Invia dati al backend"""
        data = self.read_sensors()
        data["device_id"] = self.device_id
        data["timestamp"] = datetime.utcnow().isoformat()
        
        try:
            response = requests.post(
                f"{self.api_url}/sensor-data",
                json=data,
                timeout=5
            )
            print(f"✓ Dati inviati: {data['temperature']}°C")
            return response.status_code == 200
        except Exception as e:
            print(f"✗ Errore: {e}")
            return False
    
    def check_commands(self):
        """Verifica comandi dal backend"""
        try:
            response = requests.get(
                f"{self.api_url}/actuator/led/state",
                timeout=3
            )
            if response.status_code == 200:
                new_state = response.json().get("state", False)
                if new_state != self.led_state:
                    self.led_state = new_state
                    print(f"🔦 LED { 'acceso' if new_state else 'spento'}")
            return True
        except:
            return False
    
    def run(self, interval=5):
        """Loop principale"""
        print(f"🚀 Simulatore avviato (ID: {self.device_id})")
        while True:
            self.send_data()
            self.check_commands()
            time.sleep(interval)

if __name__ == "__main__":
    simulator = DeviceSimulator()
    simulator.run()