#!/bin/bash
# NewsHub Pro - Production Build Script
# Build the application for production deployment

echo "🏗️  Building NewsHub Pro for Production"
echo "======================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not found. Running installation..."
    ./install.sh
    echo ""
fi

# Clean previous build
if [ -d "dist" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf dist
fi

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Build completed successfully!"
    echo ""
    echo "📁 Build output: ./dist/"
    echo "📊 Build statistics:"
    
    # Show build size if available
    if [ -d "dist" ]; then
        echo "   Total size: $(du -sh dist | cut -f1)"
        echo "   Files created: $(find dist -type f | wc -l)"
    fi
    
    echo ""
    echo "🚀 Ready for deployment!"
    echo "   • Upload the 'dist' folder to your web server"
    echo "   • Or use a service like Netlify, Vercel, or GitHub Pages"
    echo ""
else
    echo ""
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi