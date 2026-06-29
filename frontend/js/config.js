// Cambia con URL Render dopo il deploy
// Es: https://smart-node-monitor-api.onrender.com
export const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://smart-node-monitor.onrender.com'
