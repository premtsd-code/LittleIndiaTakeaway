const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  time: String,
  available: Boolean
});




const generateTimeSlots = () => {
  const timeSlots = [];
  const times = [
    '9 AM', '10 AM', '11 AM', '12 PM', '1  PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
  ];

  times.forEach(time => {
    timeSlots.push({
      time,
      available: false
    });
  });

  return timeSlots;
};


//populating the deliveryslots with this data
const deliverySlotSchema = new mongoose.Schema({
  day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  isOpen: { type: Boolean, required: false },
  timeSlots: { type: [timeSlotSchema], default: generateTimeSlots }
});

module.exports = mongoose.model('DeliverySlot', deliverySlotSchema);
