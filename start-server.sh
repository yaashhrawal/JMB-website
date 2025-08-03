#!/bin/bash

# JMB Udaipur Website - Server Launcher
# This script tries different methods to start a local server

echo "🍯 Starting JMB Udaipur Website Server..."
echo "============================================"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -ti:$1 >/dev/null 2>&1
}

PORT=8000

# Check if port is already in use
if port_in_use $PORT; then
    echo "⚠️  Port $PORT is already in use!"
    echo "Trying to find an available port..."
    for ((i=8001; i<=8010; i++)); do
        if ! port_in_use $i; then
            PORT=$i
            break
        fi
    done
fi

echo "🌐 Using port: $PORT"
echo "📁 Serving from: $SCRIPT_DIR"
echo "============================================"

# Try different server options
if command_exists python3; then
    echo "🐍 Starting Python 3 server..."
    python3 server.py
elif command_exists python; then
    echo "🐍 Starting Python server..."
    python -m http.server $PORT
elif command_exists node; then
    echo "📦 Starting Node.js server..."
    node server.js
elif command_exists php; then
    echo "🐘 Starting PHP server..."
    php -S localhost:$PORT
else
    echo "❌ No suitable server found!"
    echo "Please install one of the following:"
    echo "  - Python 3 (recommended)"
    echo "  - Node.js"
    echo "  - PHP"
    echo ""
    echo "🌐 Alternatively, you can open index.html directly in your browser:"
    echo "   file://$SCRIPT_DIR/index.html"
    
    # Try to open the file directly
    if command_exists open; then
        echo "🚀 Opening website directly in browser..."
        open "$SCRIPT_DIR/index.html"
    elif command_exists xdg-open; then
        echo "🚀 Opening website directly in browser..."
        xdg-open "$SCRIPT_DIR/index.html"
    fi
fi