const mongoose = require('mongoose');

// TimeSlot schema to represent each time slot for delivery
const timeSlotSchema = new mongoose.Schema({
  time: String,    // The time of the slot (e.g., '9 AM', '10 AM')
  available: Boolean  // Whether the time slot is available for delivery (true/false)
});

// Function to generate default time slots for the day
const generateTimeSlots = () => {
  const timeSlots = [];
  const times = [
    '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
  ];

  // Create time slots and set their availability to false by default
  times.forEach(time => {
    timeSlots.push({
      time,
      available: false  // All time slots are initially unavailable
    });
  });

  return timeSlots;
};

// DeliverySlot schema representing the available delivery slots for each day
const deliverySlotSchema = new mongoose.Schema({
  day: { 
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
    required: true 
  },  // Day of the week (e.g., Monday, Tuesday, etc.)
  
  isOpen: { type: Boolean, required: false },  // Whether the restaurant is open on this day (optional field)
  
  timeSlots: { 
    type: [timeSlotSchema], 
    default: generateTimeSlots 
  }  // Array of time slots, generated by default using the generateTimeSlots function
});

// Export the DeliverySlot model, which represents delivery slots for each day
module.exports = mongoose.model('DeliverySlot', deliverySlotSchema);
