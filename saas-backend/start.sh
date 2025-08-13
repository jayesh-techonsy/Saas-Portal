#!/bin/bash

# Startup script for Render deployment
echo "🚀 Starting Wassal SaaS Backend..."

# Check if we're in the right directory
if [ ! -f "main.py" ]; then
    echo "❌ Error: main.py not found. Make sure you're in the saas-backend directory."
    exit 1
fi

# Check if requirements are installed
if [ ! -d "venv" ] && [ ! -d "Lib" ]; then
    echo "📦 Installing requirements..."
    pip install -r requirements.txt
fi

# Get port from environment (Render requirement)
PORT=${PORT:-8000}
HOST=${HOST:-0.0.0.0}

echo "✅ Environment variables loaded successfully"
echo "🌐 Starting server on $HOST:$PORT"

# Start the FastAPI application
exec uvicorn main:app --host $HOST --port $PORT --log-level info 