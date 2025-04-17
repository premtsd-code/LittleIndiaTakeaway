const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const csrf = require('csrf');

const app = express();

// Routes
const authRoutes = require('./routes/authRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deliverySlotsRoutes = require('./routes/deliverySlotsRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Set up the port
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://gptpremium2425:shAfCpg2xyPmMfF2@internetsolutions.e6idy0q.mongodb.net/?retryWrites=true&w=majority&appName=internetsolutions', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse incoming JSON requests
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dhpwsr9l0',
  api_key: '468359717658564',
  api_secret: 'aV_j1eBuEWYKNkxFJ-t5DBkM-_0',
});

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://eloquent-starlight-43d9b9.netlify.app'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// CSRF Protection Configuration
const csrfProtection = csrf({ cookie: true });
app.options('*', cors(corsOptions)); // Pre-flight request handling

// Base route
app.get('/', (req, res) => {
  res.send('Use Postman.');
});

// API Routes
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/deliveryslots', deliverySlotsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/fooditems', foodItemRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
