#!/bin/bash
# NewsHub Pro - Installation Script
# Professional news web application installer

echo "📰 NewsHub Pro - Professional News Application"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Installation completed successfully!"
    echo ""
    echo "Next steps:"
    echo "  • Run './dev.sh' to start the development server"
    echo "  • Run './build.sh' to build for production"
    echo ""
    echo "Features included:"
    echo "  ✅ Professional news aggregation"
    echo "  ✅ Search and category filtering"
    echo "  ✅ Responsive design"
    echo "  ✅ Dark/Light mode toggle"
    echo "  ✅ Article bookmarking"
    echo "  ✅ TypeScript support"
    echo "  ✅ Tailwind CSS styling"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi