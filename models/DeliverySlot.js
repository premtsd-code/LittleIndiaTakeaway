const mongoose = require('mongoose');

const deliverySlotSchema = new mongoose.Schema({
  day: String, // Monday to Sunday
  time: String,
  availableSlots: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('DeliverySlot', deliverySlotSchema);
