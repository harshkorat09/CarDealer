#!/bin/bash

echo "🚀 Deploying AutoVault to Railway..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: AutoVault car marketplace"
else
    echo "📝 Adding changes to Git..."
    git add .
    git commit -m "Update: AutoVault deployment"
fi

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⬆️ Pushing to existing GitHub repository..."
    git push origin main
else
    echo "⚠️ No GitHub remote found. Please:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/yourusername/yourrepo.git"
    echo "3. Run: git push -u origin main"
    echo "4. Then deploy on Railway by connecting your GitHub repo"
fi

echo "✅ Code pushed to GitHub!"
echo "🌐 Now go to Railway.app and deploy from your GitHub repository"