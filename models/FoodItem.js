const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
