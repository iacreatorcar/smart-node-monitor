export function createTemperatureChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d')

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperatura (°C)',
                data: [],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#22c55e',
                tension: 0.4,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: { duration: 300 },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderWidth: 1,
                    titleColor: '#94a3b8',
                    bodyColor: '#f1f5f9',
                }
            },
            scales: {
                x: {
                    ticks: { color: '#64748b', maxTicksLimit: 8, maxRotation: 0 },
                    grid: { color: '#1e293b' },
                },
                y: {
                    ticks: { color: '#64748b', callback: v => v + '°C' },
                    grid: { color: '#334155' },
                    min: 10,
                    max: 50,
                }
            }
        }
    })
}

export function updateChart(chart, readings) {
    chart.data.labels = readings.map(r => {
        const d = new Date(r.timestamp)
        return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    })
    chart.data.datasets[0].data = readings.map(r => r.temperature)

    const temps = readings.map(r => r.temperature)
    const max = Math.max(...temps)
    if (max > 30) {
        chart.data.datasets[0].borderColor = '#ef4444'
        chart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.1)'
        chart.data.datasets[0].pointBackgroundColor = '#ef4444'
    } else if (max > 25) {
        chart.data.datasets[0].borderColor = '#f59e0b'
        chart.data.datasets[0].backgroundColor = 'rgba(245, 158, 11, 0.1)'
        chart.data.datasets[0].pointBackgroundColor = '#f59e0b'
    } else {
        chart.data.datasets[0].borderColor = '#22c55e'
        chart.data.datasets[0].backgroundColor = 'rgba(34, 197, 94, 0.1)'
        chart.data.datasets[0].pointBackgroundColor = '#22c55e'
    }

    chart.update()
}
