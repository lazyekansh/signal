#!/bin/bash
# NewsHub Pro - Development Server Script
# Start the development server with hot reloading

echo "🚀 Starting NewsHub Pro Development Server"
echo "=========================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not found. Running installation..."
    ./install.sh
fi

# Start development server
echo "🔥 Starting Vite development server..."
echo "📱 Your app will be available at: http://localhost:8080"
echo "🔄 Hot reloading enabled - changes will be reflected instantly"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev