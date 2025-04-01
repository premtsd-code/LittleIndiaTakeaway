const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Food item must have a name
  },
  description: {
    type: String,
    required: true, // Food item must have a description
  },
  price: {
    type: Number,
    required: true, // Price is mandatory
    min: 0, // Price cannot be negative
  },
  category: {
    type: String,
    enum: ['STARTERS', 'MAINCOURSE', 'DESERTS', 'DRINKS'], // Enum categories
    required: true,
  },
  imageURL: {
    type: String,
    required: true, // Image URL for the food item
  },
  isVisible: {
    type: Boolean,
    default: true, // Whether the food item is visible to customers
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set update date
  },
});

// Add a pre-save hook to update the `updatedAt` field
foodItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
