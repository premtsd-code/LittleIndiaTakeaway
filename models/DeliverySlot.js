const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  time: String,
  available: Boolean
});


const generateTimeSlots = () => {
  const timeSlots = [];
  const times = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  times.forEach(time => {
    timeSlots.push({
      time,
      available: false
    });
  });

  return timeSlots;
};

const deliverySlotSchema = new mongoose.Schema({
  day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  isOpen: { type: Boolean, required: false },
  timeSlots: { type: [timeSlotSchema], default: generateTimeSlots }
});

module.exports = mongoose.model('DeliverySlot', deliverySlotSchema);
