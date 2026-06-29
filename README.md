# 📊 Smart Node Monitor

Sistema full-stack per il monitoraggio remoto di sensori industriali in tempo reale.

**Sviluppato da [Carmine Dalise](https://github.com/iacreatorcar) — Founder**

---

## 🎯 Il Progetto

Smart Node Monitor simula uno scenario reale di monitoraggio industriale: un sensore di temperatura invia dati ogni 5 secondi a un backend cloud, che li salva su database e li espone tramite una dashboard web interattiva con aggiornamenti in tempo reale.

L'operatore può monitorare la temperatura da qualsiasi dispositivo, ricevere alert visivi quando supera soglie critiche e controllare attuatori remoti (LED, buzzer) dalla dashboard.

---

## 🏗️ Stack Tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Backend | FastAPI (Python) |
| Database | Supabase (PostgreSQL + Realtime) |
| Frontend | HTML + CSS + JavaScript |
| Simulatore | Python |
| Deploy | Vercel (frontend) + Railway (backend) |

---

## 🚀 Avvio Locale

**Prerequisiti:** Python 3.11+, venv installato

### 1. Backend (porta 8000)
```powershell
$env:PYTHONPATH = "C:\Users\aeria\Sviluppo\smart-node-monitor"
cd backend
..\venv\Scripts\uvicorn.exe app.main:app --reload --port 8000
```

### 2. Frontend (porta 3000)
```powershell
cd frontend
python -m http.server 3000
```
Apri: `http://localhost:3000`

### 3. Simulatore
```powershell
.\venv\Scripts\python.exe simulator\device_simulator.py
```

---

## 📡 API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| POST | `/api/sensor-data` | Invia lettura sensore |
| GET | `/api/sensor-data/latest` | Ultima lettura |
| GET | `/api/sensor-data/history` | Storico 24h |
| POST | `/api/actuator/{type}` | Controlla LED/Buzzer |
| GET | `/api/actuator/{type}/state` | Stato attuatore |

Documentazione interattiva: `http://localhost:8000/docs`

---

## ⚙️ Configurazione

Crea `.env.local` nella root:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📁 Struttura

```
smart-node-monitor/
├── backend/
│   └── app/
│       ├── main.py          # FastAPI app
│       ├── database.py      # Connessione Supabase
│       ├── crud.py          # Operazioni DB
│       ├── schemas.py       # Modelli Pydantic
│       └── routes/
│           ├── sensor.py    # Endpoint sensori
│           └── actuator.py  # Endpoint attuatori
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── app.js
│       ├── chart-config.js
│       └── supabase-client.js
├── simulator/
│   └── device_simulator.py
└── docs/
    └── guida.html           # Guida completa
```

---

## 🗺️ Roadmap

- [x] Backend FastAPI + Supabase
- [x] Dashboard con grafico realtime
- [x] Simulatore IoT
- [x] Aggiornamenti Realtime WebSocket
- [ ] Deploy Vercel + Railway
- [ ] Autenticazione utenti
- [ ] Alert email su soglia critica
- [ ] Supporto multi-dispositivo

---

*© 2026 Carmine Dalise*
