const mongoose = require('mongoose');

// Schema for food items in the restaurant
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,  // Name of the food item (e.g., "Pizza", "Coke")
    required: true,  // Name is a required field
  },
  description: {
    type: String,  // Description of the food item
    required: true,  // Description is a required field
  },
  price: {
    type: Number,  // Price of the food item
    required: true,  // Price is a required field
    min: 0,  // Price cannot be negative
  },
  category: {
    type: String,  // Category of the food item (e.g., "STARTERS", "MAINCOURSE", "DESSERTS", "DRINKS")
    enum: ['STARTERS', 'MAINCOURSE', 'DESSERTS', 'DRINKS'],  // Restrict the category to these four options
    required: true,  // Category is a required field
  },
  imageURL: {
    type: String,  // URL for the image of the food item
    required: true,  // Image URL is a required field
  },
  isVisible: {
    type: Boolean,  // Boolean flag indicating whether the food item is visible to customers
    default: true,  // Default visibility is true (item is visible)
  },
  createdAt: {
    type: Date,  // Timestamp when the food item was created
    default: Date.now,  // Default to the current date and time
  },
  updatedAt: {
    type: Date,  // Timestamp when the food item was last updated
    default: Date.now,  // Default to the current date and time
  },
});

// Middleware to update the updatedAt field before saving the food item
foodItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();  // Set updatedAt to the current date and time before saving
  next();  // Proceed to the next middleware or save the document
});

// Export the FoodItem model based on the foodItemSchema
module.exports = mongoose.model('FoodItem', foodItemSchema);
