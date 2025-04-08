const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Connect to MongoDB (local instance)
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


// Model import
const DeliverySlot = require('./models/DeliverySlot'); // Adjust the path to your model

// Middleware
app.use(express.json());

// Example function to insert data (optional for testing)
const createDeliverySlot = async (day, isOpen) => {
  try {
    const newSlot = new DeliverySlot({
      day,
      isOpen,
    });
    await newSlot.save();
    console.log(`${day} delivery slot created!`);
  } catch (err) {
    console.error('Error creating delivery slot:', err);
  }
};

// Define a route to fetch all delivery slots
app.get('/api/deliveryslots', async (req, res) => {
  try {
    const deliverySlots = await DeliverySlot.find();
    res.status(200).json(deliverySlots);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching delivery slots' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Create some delivery slots for testing (uncomment if needed)
// createDeliverySlot('Monday', true);
// createDeliverySlot('Tuesday', true);
// createDeliverySlot('Wednesday', true);
// createDeliverySlot('Thursday', true);
// createDeliverySlot('Friday', true);
// createDeliverySlot('Saturday', true);
// createDeliverySlot('Sunday', true);
