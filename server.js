const express = require('express');
const mongoose = require('mongoose');
const app = express();
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


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://gptpremium2425:shAfCpg2xyPmMfF2@internetsolutions.e6idy0q.mongodb.net/?retryWrites=true&w=majority&appName=internetsolutions', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.get('/', function(req, res){
    res.send('Use Postman.');
   });
app.use('/api/owner', ownerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/fooditems', foodItemRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

