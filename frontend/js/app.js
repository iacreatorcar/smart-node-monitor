import { subscribeToSensorData, subscribeToActuators } from './supabase-client.js'
import { createTemperatureChart, updateChart } from './chart-config.js'
import { API_BASE } from './config.js'

const API = `${API_BASE}/api`

class SmartNodeApp {
    constructor() {
        this.tempEl = document.getElementById('currentTemp')
        this.updateEl = document.getElementById('lastUpdate')
        this.dataBody = document.getElementById('dataBody')
        this.ledBtn = document.getElementById('ledToggle')
        this.buzzerBtn = document.getElementById('buzzerToggle')
        this.chart = null
        this.ledState = false
        this.buzzerState = false
        this.init()
    }

    async init() {
        this.chart = createTemperatureChart('temperatureChart')
        await this.loadLatest()
        await this.loadHistory()
        await this.loadActuatorStates()
        this.setupRealtime()
        this.setupControls()
        setInterval(() => this.loadLatest(), 10000)
    }

    async loadLatest() {
        try {
            const res = await fetch(`${API}/sensor-data/latest`)
            if (!res.ok) return
            const data = await res.json()
            if (!data) return
            this.updateTemperatureUI(data.temperature)
            this.updateEl.textContent = `Ultimo aggiornamento: ${new Date(data.timestamp).toLocaleTimeString('it-IT')}`
        } catch (e) {
            console.error('Errore lettura dati:', e)
        }
    }

    async loadHistory() {
        try {
            const res = await fetch(`${API}/sensor-data/history?limit=50`)
            if (!res.ok) return
            const data = await res.json()
            if (!Array.isArray(data)) return
            updateChart(this.chart, data)
            this.updateTable(data.slice(-10).reverse())
        } catch (e) {
            console.error('Errore storico:', e)
        }
    }

    async loadActuatorStates() {
        for (const type of ['led', 'buzzer']) {
            try {
                const res = await fetch(`${API}/actuator/${type}/state`)
                if (!res.ok) continue
                const data = await res.json()
                if (type === 'led') this.setLedUI(data.state)
                else this.setBuzzerUI(data.state)
            } catch (e) {}
        }
    }

    updateTemperatureUI(temp) {
        this.tempEl.textContent = `${temp}°C`
        const card = document.querySelector('.temperature-card')
        card.classList.remove('warm', 'hot')
        if (temp > 30) card.classList.add('hot')
        else if (temp > 25) card.classList.add('warm')
    }

    updateTable(rows) {
        this.dataBody.innerHTML = rows.map(r => {
            const temp = r.temperature
            const cls = temp > 30 ? 'temp-hot' : temp > 25 ? 'temp-warm' : 'temp-normal'
            const time = new Date(r.timestamp).toLocaleString('it-IT')
            const hum = r.humidity != null ? `${r.humidity}%` : '--'
            return `<tr>
                <td>${time}</td>
                <td class="temp-value ${cls}">${temp}°C</td>
                <td>${hum}</td>
            </tr>`
        }).join('')
    }

    setupRealtime() {
        subscribeToSensorData((newData) => {
            this.updateTemperatureUI(newData.temperature)
            this.updateEl.textContent = `Ultimo aggiornamento: ${new Date(newData.timestamp).toLocaleTimeString('it-IT')}`
            this.loadHistory()
        })

        subscribeToActuators((data) => {
            if (data.actuator_type === 'led') this.setLedUI(data.state)
            else if (data.actuator_type === 'buzzer') this.setBuzzerUI(data.state)
        })
    }

    setupControls() {
        this.ledBtn.addEventListener('click', async () => {
            this.ledState = !this.ledState
            await this.sendActuator('led', this.ledState)
            this.setLedUI(this.ledState)
        })

        this.buzzerBtn.addEventListener('click', async () => {
            this.buzzerState = !this.buzzerState
            await this.sendActuator('buzzer', this.buzzerState)
            this.setBuzzerUI(this.buzzerState)
        })
    }

    async sendActuator(type, state) {
        try {
            await fetch(`${API}/actuator/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state }),
            })
        } catch (e) {
            console.error(`Errore attuatore ${type}:`, e)
        }
    }

    setLedUI(state) {
        this.ledState = state
        this.ledBtn.textContent = state ? '💡 Spegni LED' : '💡 Accendi LED'
        this.ledBtn.classList.toggle('active', state)
    }

    setBuzzerUI(state) {
        this.buzzerState = state
        this.buzzerBtn.textContent = state ? '🔊 Disattiva Buzzer' : '🔊 Attiva Buzzer'
        this.buzzerBtn.classList.toggle('active', state)
    }
}

document.addEventListener('DOMContentLoaded', () => new SmartNodeApp())
