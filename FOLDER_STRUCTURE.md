# CarBazzar - Project Folder Structure

## 📁 Project Overview
CarBazzar is a premium car marketplace built with React + Vite (frontend) and Express + MongoDB (backend).

---

## 🗂️ Root Directory Structure

```
CarDealer/
├── .git/                    # Git version control
├── .gitignore              # Git ignore file
├── client/                 # React + Vite frontend
├── server/                 # Express backend API
├── deploy.bat              # Windows deployment script
├── deploy.sh               # Linux/Mac deployment script
├── README.md               # Project documentation
└── FOLDER_STRUCTURE.md     # This file
```

---

## 📂 Frontend Directory (`client/`)

```
client/
├── node_modules/           # NPM dependencies
├── public/                 # Static assets (favicon, etc.)
├── src/                    # Source code
│   ├── assets/            # Images, fonts, SVGs
│   ├── components/        # Reusable React components
│   │   ├── Navbar.jsx    # Navigation bar
│   │   ├── Footer.jsx    # Footer section
│   │   └── ContactForm.jsx # Contact form component
│   ├── pages/            # Page components (routes)
│   │   ├── Home.jsx      # Homepage with car listing
│   │   └── CarDetail.jsx # Individual car detail page
│   ├── data/             # Local fallback data
│   │   └── cars.js       # Car database fallback (synced with server)
│   ├── App.jsx           # Main app component with routing
│   ├── App.css           # Global app styles
│   ├── index.css         # Tailwind CSS import
│   └── main.jsx          # React entry point
├── .env                    # Environment variables (API_URL, etc.)
├── .env.example           # Example environment variables
├── .gitignore            # Files to ignore in git
├── eslint.config.js      # ESLint configuration
├── package.json          # Frontend dependencies & scripts
├── package-lock.json     # Locked dependency versions
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite bundler configuration
├── index.html            # HTML entry point
├── railway.toml          # Railway deployment config
└── README.md             # Frontend-specific docs
```

### Frontend Key Files:
- **`package.json` scripts:**
  - `npm run dev` - Start dev server (http://localhost:5173)
  - `npm run build` - Build for production
  - `npm run lint` - Run ESLint
  - `npm run preview` - Preview production build

---

## 📂 Backend Directory (`server/`)

```
server/
├── node_modules/          # NPM dependencies
├── routes/               # API route handlers
│   ├── cars.js          # GET /api/cars (list all, filter, search)
│   ├── contacts.js      # POST /api/contacts (form submissions)
│   └── admin.js         # Admin endpoints
├── models/              # Mongoose schemas
│   ├── Car.js          # Car data model
│   └── Contact.js      # Contact form model
├── data/               # Database seed data
│   └── cars.js        # Car inventory seed data
├── middleware/         # Express middleware (if any)
├── .env                # Environment variables (MONGO_URI, PORT, etc.)
├── .env.example        # Example environment variables
├── .gitignore         # Files to ignore in git
├── index.js           # Express app entry point
├── package.json       # Backend dependencies & scripts
├── package-lock.json  # Locked dependency versions
├── railway.toml       # Railway deployment config
└── README.md          # Backend-specific docs
```

### Backend Key Files:
- **`package.json` scripts:**
  - `npm start` - Start server (http://localhost:5000)

---

## 🛣️ API Routes

### Cars Endpoints
```
GET  /api/cars                    # Get all cars
GET  /api/cars/:id                # Get single car by ID
GET  /api/cars?brand=X&price=X   # Filter cars
GET  /api/cars?search=term        # Search cars
```

### Contact Endpoints
```
POST /api/contacts                # Submit contact form
```

### Admin Endpoints
```
POST /api/admin/seed              # Reseed database
```

---

## 🗄️ Database Schema (MongoDB)

### Car Collection
```javascript
{
  _id: ObjectId,
  name: String,           // e.g., "Maruti Suzuki Swift VXI"
  brand: String,          // e.g., "Maruti Suzuki"
  price: Number,          // e.g., 650000
  year: Number,           // e.g., 2020
  fuelType: String,       // "Petrol" | "Diesel"
  transmission: String,   // "Manual" | "Automatic"
  mileage: String,        // e.g., "45,000 km"
  seats: Number,          // e.g., 5
  bodyType: String,       // "Sedan" | "Hatchback" | "SUV"
  images: [String],       // Array of image URLs
  overview: String,       // Car description
  features: [String],     // Array of features
  color: String,          // Car color
  owners: Number,         // Previous owner count
  insurance: String,      // Insurance status
  sellerName: String,     // e.g., "CarBazzar"
  sellerLocation: String, // e.g., "Delhi, India"
  createdAt: Date,        // Auto timestamp
  updatedAt: Date         // Auto timestamp
}
```

### Contact Collection
```javascript
{
  _id: ObjectId,
  name: String,           // Contact name
  email: String,          // Contact email
  message: String,        // Inquiry message
  createdAt: Date,        // Auto timestamp
  updatedAt: Date         // Auto timestamp
}
```

---

## 🔑 Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000
```

### Backend (`.env`)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/carbazzar
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## 🎯 Key Features Implementation

### 1. **Car Listing (Home Page)**
- Location: `client/src/pages/Home.jsx`
- Fetches cars from `/api/cars`
- Supports filtering by brand, fuel type, transmission, price
- Search functionality for car names and descriptions

### 2. **Car Details Page**
- Location: `client/src/pages/CarDetail.jsx`
- Shows full car details with image gallery
- EMI calculator with multiple loan terms
- Contact form for test drive booking
- Highlight features and specs

### 3. **Contact Form**
- Location: `client/src/components/ContactForm.jsx`
- Submit to `/api/contacts`
- Validation on frontend
- Stores inquiries in MongoDB

### 4. **UI Components**
- **Navbar**: Navigation and branding
- **Footer**: Footer information
- **Cards**: Car listing cards with quick info

---

## 🎨 Styling Stack

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility

---

## 📦 Key Dependencies

### Frontend
- **React 19.2**: UI library
- **React Router 7.15**: Client-side routing
- **Axios 1.16**: HTTP requests
- **Tailwind CSS 3.4**: Utility styling
- **Lucide React 1.16**: Icon library
- **Framer Motion 12.38**: Animation library

### Backend
- **Express 5.2**: Web framework
- **Mongoose 9.6**: MongoDB ODM
- **MongoDB**: Database
- **CORS 2.8**: Cross-origin requests
- **dotenv 17.4**: Environment variables
- **bcryptjs 3.0**: Password hashing
- **JWT 9.0**: Authentication tokens

---

## 🚀 Deployment

### Railway Deployment
- Both frontend and backend use `railway.toml` for deployment
- Frontend builds with `npm run build`
- Backend runs with `npm start`

### Environment Setup
1. Set `MONGO_URI` in backend `.env`
2. Set `VITE_API_URL` in frontend `.env`
3. Deploy scripts: `deploy.bat` (Windows), `deploy.sh` (Linux/Mac)

---

## ✅ Quality Assurance

### Frontend
- **ESLint**: Code linting
- **Vite**: Fast development & optimized builds
- **Fallback Data**: `client/src/data/cars.js` for offline testing

### Backend
- **Mongoose Validation**: Schema validation
- **Error Handling**: Try-catch blocks
- **Database Seeding**: Auto-populate cars on startup

---

## 📋 Development Workflow

### 1. Start Development
```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

### 2. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 3. Testing
- Use browser DevTools for frontend debugging
- Use Postman or cURL for API testing
- Check MongoDB Atlas for database queries

---

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/cars"
**Solution:** Ensure backend is running on port 5000 and MongoDB is connected

### Issue: Frontend shows old data
**Solution:** Clear browser cache and restart dev server

### Issue: CORS errors
**Solution:** Check `CLIENT_URL` in backend `.env`

### Issue: Image URLs not loading
**Solution:** Verify image URLs are from AEPLCDN or Cardekho (live sources)

---

## 📞 Contact & Support

For inquiries about the application, use the contact form on the marketplace or submit through the API at `/api/contacts`.

---

**Last Updated:** May 15, 2026  
**Project Status:** ✅ Production Ready
