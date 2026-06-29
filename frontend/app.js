import { supabase, subscribeToSensorData } from './supabase-client.js'

class SmartNodeApp {
    constructor() {
        this.currentTemp = document.getElementById('currentTemp')
        this.lastUpdate = document.getElementById('lastUpdate')
        this.dataBody = document.getElementById('dataBody')
        this.chart = null
        this.init()
    }
    
    async init() {
        // Carica dati iniziali
        await this.loadLatestData()
        await this.loadHistory()
        
        // Setup real-time
        this.setupRealtime()
        
        // Setup controlli
        this.setupControls()
        
        // Aggiorna ogni 30 secondi
        setInterval(() => this.loadLatestData(), 30000)
    }
    
    async loadLatestData() {
        try {
            const response = await fetch('/api/sensor-data/latest')
            const data = await response.json()
            if (data) {
                this.currentTemp.textContent = `${data.temperature}°C`
                this.lastUpdate.textContent = `Ultimo aggiornamento: ${new Date(data.timestamp).toLocaleTimeString()}`
                
                // Aggiorna colore in base alla temperatura
                this.updateTemperatureColor(data.temperature)
            }
        } catch (error) {
            console.error('Errore caricamento dati:', error)
        }
    }
    
    async loadHistory() {
        try {
            const response = await fetch('/api/sensor-data/history?limit=50')
            const data = await response.json()
            this.updateChart(data)
            this.updateTable(data)
        } catch (error) {
            console.error('Errore caricamento storico:', error)
        }
    }
    
    setupRealtime() {
        subscribeToSensorData((newData) => {
            // Aggiorna UI in tempo reale
            this.currentTemp.textContent = `${newData.temperature}°C`
            this.updateTemperatureColor(newData.temperature)
            
            // Aggiorna grafico e tabella
            this.loadHistory()
        })
    }
    
    updateTemperatureColor(temp) {
        const card = document.querySelector('.temperature-card')
        if (temp > 30) {
            card.style.borderColor = '#ff4444'
            card.style.backgroundColor = '#fff0f0'
        } else if (temp > 25) {
            card.style.borderColor = '#ffaa44'
            card.style.backgroundColor = '#fff8f0'
        } else {
            card.style.borderColor = '#44bb44'
            card.style.backgroundColor = '#f0fff0'
        }
    }
    
    setupControls() {
        document.getElementById('ledToggle').addEventListener('click', async () => {
            const currentState = this.ledState || false
            await this.toggleActuator('led', !currentState)
        })
        
        document.getElementById('buzzerToggle').addEventListener('click', async () => {
            const currentState = this.buzzerState || false
            await this.toggleActuator('buzzer', !currentState)
        })
    }
    
    async toggleActuator(type, state) {
        try {
            const response = await fetch(`/api/actuator/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state })
            })
            if (response.ok) {
                console.log(`${type} ${state ? 'acceso' : 'spento'}`)
                // Aggiorna UI del pulsante
                const button = document.getElementById(`${type}Toggle`)
                button.textContent = state ? 
                    `${type === 'led' ? '💡' : '🔊'} Spegni ${type}` : 
                    `${type === 'led' ? '💡' : '🔊'} Accendi ${type}`
                button.classList.toggle('active', state)
            }
        } catch (error) {
            console.error(`Errore controllo ${type}:`, error)
        }
    }
    
    updateChart(data) {
        // Implementazione con Chart.js
    }
    
    updateTable(data) {
        // Popola tabella
    }
}

// Avvia app quando DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    new SmartNodeApp()
})