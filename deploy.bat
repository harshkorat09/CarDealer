@echo off
echo 🚀 Deploying AutoVault to Railway...

REM Check if git is initialized
if not exist ".git" (
    echo 📝 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: AutoVault car marketplace"
) else (
    echo 📝 Adding changes to Git...
    git add .
    git commit -m "Update: AutoVault deployment"
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if %errorlevel% == 0 (
    echo ⬆️ Pushing to existing GitHub repository...
    git push origin main
) else (
    echo ⚠️ No GitHub remote found. Please:
    echo 1. Create a new repository on GitHub
    echo 2. Run: git remote add origin https://github.com/yourusername/yourrepo.git
    echo 3. Run: git push -u origin main
    echo 4. Then deploy on Railway by connecting your GitHub repo
)

echo ✅ Code pushed to GitHub!
echo 🌐 Now go to Railway.app and deploy from your GitHub repository
pause