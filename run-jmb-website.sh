#!/bin/bash

echo "🍯 JMB Udaipur Website Launcher"
echo "==============================="

# Stop any existing servers on common ports
echo "🛑 Stopping existing servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "   No process on port 3000"
lsof -ti:8000 | xargs kill -9 2>/dev/null || echo "   No process on port 8000"
lsof -ti:8080 | xargs kill -9 2>/dev/null || echo "   No process on port 8080"

# Kill any npm/next processes
pkill -f "npm run dev" 2>/dev/null || echo "   No npm dev processes"
pkill -f "next dev" 2>/dev/null || echo "   No Next.js processes"

echo ""
echo "🚀 Starting JMB Udaipur Website..."
echo "📁 Directory: /Users/mac/jmb-udaipur-website"
echo ""

# Change to JMB website directory
cd /Users/mac/jmb-udaipur-website

# Try different server methods
if command -v python3 >/dev/null 2>&1; then
    echo "🐍 Using Python 3 server on port 8080..."
    echo "🌐 Website will be available at: http://localhost:8080"
    echo "📱 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "==============================="
    python3 -m http.server 8080
elif command -v python >/dev/null 2>&1; then
    echo "🐍 Using Python server on port 8080..."
    echo "🌐 Website will be available at: http://localhost:8080"
    echo "📱 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "==============================="
    python -m http.server 8080
elif command -v php >/dev/null 2>&1; then
    echo "🐘 Using PHP server on port 8080..."
    echo "🌐 Website will be available at: http://localhost:8080"
    echo "📱 Open this URL in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "==============================="
    php -S localhost:8080
else
    echo "❌ No suitable server found!"
    echo ""
    echo "💡 Manual options:"
    echo "1. Double-click on index.html to open directly"
    echo "2. Install Python: brew install python3"
    echo "3. Or manually run: python3 -m http.server 8080"
    echo ""
    echo "📂 Website files are in: /Users/mac/jmb-udaipur-website/"
fi