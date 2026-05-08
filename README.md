# Real-Time Energy Monitoring Dashboard

A full-stack industrial energy monitoring system that tracks real-time power consumption, production metrics, and energy efficiency across manufacturing processes. The system features two dashboard implementations — a Python/Dash backend dashboard and a modern React/TypeScript frontend — both powered by a Flask + WebSocket API backed by a Microsoft SQL Server database.

---

![final Output](outputs/RealTimeEnergyMonitoring.mp4)

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Data Generation](#data-generation)
- [Running the Application](#running-the-application)
- [Dashboard Walkthrough](#dashboard-walkthrough)
- [Monitored Processes](#monitored-processes)
- [Key Metrics](#key-metrics)

---

## Overview

This project simulates and monitors energy consumption across 7 manufacturing processes in a foundry/casting facility. It demonstrates real-time data streaming using WebSockets, interactive charting with Plotly and Chart.js, and SQL Server as a time-series store for energy readings.

The data generation layer produces synthetic but realistic energy telemetry — including power factor anomalies, equipment state transitions (Working / Idle / Maintenance), and production batch tracking — giving the dashboards live, meaningful data to visualize.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Data Generation Layer                │
│  CoreMaking · SandProcessing · Moulding · Melting       │
│  Melt_prod · Laddle · PostProcessing · Auxiliary        │
│                  (RunAll.py orchestrator)               │
└───────────────────────┬─────────────────────────────────┘
                        │ INSERT every minute
                        ▼
              ┌──────────────────┐
              │   SQL Server DB  │
              │ Energy Monitoring│
              │   _Realtime      │
              └────────┬─────────┘
                       │ SQLAlchemy / pyodbc
                       ▼
          ┌────────────────────────┐
          │   Flask API Server     │
          │   flask_server.py      │
          │                        │
          │  REST   /api/*         │
          │  WS     /ws            │
          └──────┬─────────┬───────┘
                 │         │
          ┌──────▼──┐  ┌───▼──────────────────┐
          │  Dash   │  │  React / TypeScript   │
          │ app.py  │  │  Frontend (Vite)      │
          │ :8050   │  │  :5173                │
          └─────────┘  └──────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Database | Microsoft SQL Server |
| ORM / Driver | SQLAlchemy, pyodbc |
| API Server | Flask, Flask-Sock (WebSocket) |
| Python Dashboard | Dash, Plotly, Dash Bootstrap Components |
| Frontend Framework | React 18, TypeScript |
| Frontend Build | Vite |
| Charting (Frontend) | Chart.js, react-chartjs-2 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Data Processing | Pandas, NumPy |

---

## Project Structure

```
Energy Monitoring - Real Time/
│
├── Backend/
│   ├── app.py                  # Dash dashboard application
│   ├── flask_server.py         # Flask REST + WebSocket API
│   ├── RunAll.py               # Parallel data generation orchestrator
│   ├── CoreMaking.py           # Synthetic energy data — core making
│   ├── SandProcessing.py       # Synthetic energy data — sand processing
│   ├── Moulding.py             # Synthetic energy data — moulding
│   ├── Melting.py              # Synthetic energy data — melting furnace
│   ├── Melt_prod.py            # Synthetic production metrics — melting
│   ├── Laddle.py               # Synthetic energy data — ladle handling
│   ├── PostProcessing.py       # Synthetic energy data — post-processing
│   ├── Auxiliary.py            # Synthetic energy data — auxiliary equipment
│   └── requirements.txt        # Python dependencies
│
├── Frontend/
│   ├── src/                    # React TypeScript source files
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## Features

### Real-Time Data Streaming
- WebSocket endpoint (`/ws`) pushes live energy readings from Flask to connected clients
- Auto-reconnection with 1-second retry on disconnect
- 15-second polling interval in the Dash dashboard

### Dual Dashboard Implementations
- **Dash (Python)** — Dark-themed, integrated Python dashboard with Plotly charts
- **React/TypeScript** — Modern, responsive UI with Chart.js, WebSocket connection status indicator, and month-over-month comparison cards

### Process-Level Monitoring
- Individual KPI cards for all 7 manufacturing processes
- Per-process: Power (kW), Consumption (kVAh), Power Factor, Equipment Status

### Energy Efficiency Tracking
- Daily and monthly energy consumption vs. production (tonnes)
- Consumption per tonne (kVAh/t) — a key operational KPI
- Month-over-month and day-over-day change percentages

### Production Metrics
- Daily and cumulative production in tonnes
- Heat number tracking for individual melting batches
- Furnace temperature and metal composition monitoring (Melting process)

### Equipment Status Simulation
| Status | Probability |
|---|---|
| Working | 85–90% |
| Idle | 5–10% |
| Maintenance | 5% |

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- Microsoft SQL Server (local or remote)
- SQL Server ODBC Driver installed

### Backend Setup

```bash
cd Backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Update the database connection string in `flask_server.py` to point to your SQL Server instance:

```python
# flask_server.py
connection_string = (
    "mssql+pyodbc://YOUR_SERVER/Energy Monitoring_Realtime"
    "?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)
```

The database expects the following views to exist:
- `Latest_AllEnergy_Readings_View`
- `Latest_Energy_Reading_View`
- `Daily_Consumption_View`
- `Daily_Production_View`
- `Last9_Energy_Readings_Vw`

### Frontend Setup

```bash
cd Frontend
npm install
```

### Data Generation

Run all 8 process simulators in parallel:

```bash
cd Backend
python RunAll.py
```

Or run a specific process individually:

```bash
python Melting.py
```

Each script generates minute-level energy readings for its process and writes them to SQL Server. The default date range is **April 1 – June 30, 2026**, operating hours **9 AM – 6 PM, Monday–Saturday**.

---

## Running the Application

**Start the Flask API server:**

```bash
cd Backend
python flask_server.py
# API available at http://localhost:5000
# WebSocket at  ws://localhost:5000/ws
```

**Start the Dash dashboard (Python):**

```bash
cd Backend
python app.py
# Dashboard at http://localhost:8050
```

**Start the React frontend:**

```bash
cd Frontend
npm run dev
# Dashboard at http://localhost:5173
```

---

## Dashboard Walkthrough

### Dash Dashboard (`app.py`)

| Section | Description |
|---|---|
| Process KPI Cards (Row 1+2) | Live power, consumption, and power factor for each of the 7 processes, refreshed every 15 seconds |
| Power Line Chart | Current power (kW) over the last 9 readings with data point labels |
| Daily Consumption vs Production | Combined bar + line chart showing 10-day trend |
| Energy Efficiency Chart | Daily consumption per tonne (kVAh/t) as a line chart |
| KPI Summary Row | Current power, today's consumption/production, this month vs. previous month comparison |

### React Frontend

| Section | Description |
|---|---|
| Top Metric Cards (5) | Current Power, Today's Consumption, Monthly Consumption, Consumption/Tonne, Production — with delta indicators |
| Process Detail Cards | Per-process real-time metrics for all 7 processes |
| Power Consumption Chart | Time-series chart with average, min, max statistics |
| Process Breakdown | Energy split by manufacturing process |
| Connection Status Badge | Live WebSocket state — green (connected) / red (disconnected) with manual retry |

---

## Monitored Processes

| Process | Description |
|---|---|
| Core Making | Energy for manufacturing sand cores used in casting moulds |
| Sand Processing | Energy for sand preparation, mixing, and conditioning |
| Moulding | Energy for forming metal casting moulds |
| Melting | Induction furnace energy — primary energy consumer |
| Melt Production | Production output tracking tied to melting operations |
| Ladle | Energy for ladle heating and metal transfer operations |
| Post Processing | Energy for knockout, fettling, heat treatment, and finishing |
| Auxiliary | Compressed air, lighting, HVAC, and support equipment |

---

## Key Metrics

| Metric | Unit | Description |
|---|---|---|
| Power | kW | Instantaneous power draw per process |
| Consumption | kVAh | Cumulative apparent energy consumed |
| Power Factor | — | Ratio of real to apparent power (0.75–1.00) |
| Production | Tonne | Metal produced per shift/day |
| Consumption/Tonne | kVAh/t | Energy efficiency — lower is better |
| Furnace Temperature | °C | Melting process temperature (1000–1400°C) |
| Status | — | Working / Idle / Maintenance |

---

## Video Demo

A recorded walkthrough of the dashboard is available in the project root:

```
Real-Time Energy Monitoring(Python).mp4
```
