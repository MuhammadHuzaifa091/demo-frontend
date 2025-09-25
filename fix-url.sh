#!/bin/bash
# Fix URL Configuration Script
# Run this: chmod +x fix-url.sh && ./fix-url.sh

echo "🔧 Fixing URL Configuration..."

# Stop any running dev servers
echo "🛑 Stopping development servers..."
pkill -f "npm run dev" || pkill -f "vite" || true

# Clear Vite cache
echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite
rm -rf dist

# Reinstall dependencies to ensure clean state
echo "📦 Reinstalling dependencies..."
npm install

echo "✅ Configuration fixed!"
echo ""
echo "🚀 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open browser and hard refresh (Ctrl+F5)"
echo "3. Check browser console for debug logs"
echo "4. The correct URL should be: https://demo.publicvm.com/api/v1"
