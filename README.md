# AutoVault

Premium used car marketplace built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- Luxury landing page with premium design
- Search and filter inventory by brand, fuel type, transmission, and name
- AI recommendation section with budget-based suggestions
- Car detail page with multiple images, specs, and EMI estimate
- Contact form saved to MongoDB via Express API
- Admin endpoints for contacts and car management
- Responsive layout with glassmorphism UI

## Tech stack

- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT authentication

## Run locally

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/autovault?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_here
ADMIN_EMAIL=admin@autovault.com
ADMIN_PASSWORD=Admin123!
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Get MongoDB Atlas Connection String:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Go to "Database" → "Connect" → "Connect your application"
4. Copy the connection string and replace `<username>`, `<password>`, and `<database>` with your values

Then start the backend:

```bash
npm start
```

## Deploy to Railway

### Quick Deploy (Windows)
```bash
# Run the deployment script
deploy.bat
```

### Manual Deploy
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/autovault.git
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to [Railway.app](https://railway.app)
   - Sign up/login
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Add Backend Service**
   - Railway will detect the `server/` folder
   - Set environment variables in Railway dashboard:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/autovault?retryWrites=true&w=majority
     JWT_SECRET=your_super_secure_jwt_secret_here
     ADMIN_EMAIL=admin@autovault.com
     ADMIN_PASSWORD=Admin123!
     CLIENT_URL=https://your-frontend-domain.up.railway.app
     NODE_ENV=production
     ```

4. **Add Frontend Service**
   - Add another service pointing to `client/` folder
   - Railway will auto-detect the build settings
   - Set environment variable:
     ```
     VITE_API_URL=https://your-backend-service.up.railway.app
     ```

5. **Get Live URLs**
   - Frontend: `https://your-frontend-name.up.railway.app`
   - Backend: `https://your-backend-name.up.railway.app`

**Railway Free Tier Notes:**
- 512MB RAM, 1GB disk, 100 hours/month
- Perfect for demos and small apps
- Auto-scales when needed
- No credit card required

## Notes

- The frontend fetches car listings from the backend API at `VITE_API_URL`.
- Use `client/.env.example` and `server/.env.example` as templates.
- The backend seeds a sample car inventory into MongoDB on first startup.
