const mongoose = require('mongoose');


// Item Schema for each ordered item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: function() {
      // Generate a unique orderId using a combination of "ORD" and the current timestamp
      return 'ORD' + Math.floor(Math.random() * 100000); 
    },
  },
  customer: { type: String, required: true },
  type: { type: String, enum: ['Delivery', 'Takeaway'], required: true },
  timeSlot: { type: String, default: null }, // Optional field for Delivery
  status: { type: String, enum: ['Pending', 'Delivered', 'OnHold'], default: 'Pending' },
  dateTime: { type: Date, default: Date.now }, // Automatically sets the current timestamp
  items: [itemSchema],
});

orderSchema.virtual('description').get(function() {
  // Generate a description for the order based on items
  return this.items.map(item => `${item.quantity} x ${item.name}`).join(', ');
});

// Optional: To include virtuals when converting to JSON
orderSchema.set('toJSON', { virtuals: true });
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
