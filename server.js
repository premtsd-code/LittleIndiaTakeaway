const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cloudinary = require('cloudinary').v2;
const cors = require('cors');  // For enabling cross-origin requests from React
const authRoutes = require('./routes/authRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'Restaurant Takeaway API',
      version: '1.0.0',
      description: 'API Documentation for the Restaurant Takeaway Site',
    },
    servers: [
      {
        url: 'https://littleindia-f52f947eb8a9.herokuapp.com',  // Adjust the URL to your environment (Heroku or localhost)
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to your API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const ownerRoutes = require('./routes/ownerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deliverySlotsRoutes = require('./routes/deliverySlotsRoutes');
const orderRoutes = require('./routes/orderRoutes');

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://gptpremium2425:shAfCpg2xyPmMfF2@internetsolutions.e6idy0q.mongodb.net/?retryWrites=true&w=majority&appName=internetsolutions', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.get('/', function(req, res) {
  res.send('Use Postman.');
});

app.use('/api/owner', ownerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/deliveryslots', deliverySlotsRoutes);
app.use('/api/orders', orderRoutes);  // Register the order routes
app.use('/api/fooditems', foodItemRoutes);

cloudinary.config({
  cloud_name: 'dhpwsr9l0',
  api_key: '468359717658564',
  api_secret: 'aV_j1eBuEWYKNkxFJ-t5DBkM-_0',
});

// CORS setup (to allow all origins or specific ones)
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React frontend's URL (localhost if you're testing locally)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
  credentials: true, // Allow cookies and credentials (if needed)
};


app.use(cors(corsOptions));  // Apply CORS middleware

// CSRF setup
const csrf = require('csrf');

// Disable CSRF protection globally or on specific routes
const csrfProtection = csrf({ cookie: true });
// If you want to disable CSRF for the entire app, remove or comment the next line
// app.use(csrfProtection);  // This line disables CSRF protection for the entire app

// For specific routes where CSRF is needed, apply it individually
// For example:
// app.post('/api/your-protected-route', csrfProtection, (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
