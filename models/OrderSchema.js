const mongoose = require('mongoose');
const DeliverySlot = require('./DeliverySlot');  
// Item Schema for each ordered item
const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Unique ID of the food item
  name: { type: String, required: true },  // Name of the food item
  quantity: { type: Number, required: true },  // Quantity ordered
  price: { type: Number, required: true },  // Price of the item
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User schema
  customer: { type: String, required: true },  // Name of the customer
  type: { type: String, enum: ['Delivery', 'Takeaway'], required: true },  // Delivery or Takeaway type
  timeSlot: { type: String, default: null },  // Optional time slot for delivery
  status: { type: String, enum: ['Pending', 'Delivered', 'OnHold'], default: 'Pending' },  // Order status
  dateTime: { type: Date, default: Date.now },  // Timestamp when the order is placed
  items: [itemSchema],  // Array of items ordered, with the added `uID` field
  address: { type: String, required: function() { return this.type === 'Delivery'; } },  // Address is required only for Delivery
  county: { type: String, required: function() { return this.type === 'Delivery'; } },  // County required for Delivery
  eircode: { type: String, required: function() { return this.type === 'Delivery'; } },  // Eircode required for Delivery
  email: { type: String, required: true },  // Customer's email address
  phone: { type: String, required: true },  // Customer's phone number
  discount: { type: Number, default: 0 },  // Discount applied to the order
  shipping: { type: Number, required: true },  // Shipping fee
  subtotal: { type: Number, required: true },  // Subtotal before discount and shipping
  terms: { type: Boolean, required: true },  // Whether the customer agrees to terms
  total: { type: Number, required: true },  // Total order amount after discount and shipping
});

// Create a model from the schema
orderSchema.virtual('description').get(function() {
  // Generate a description for the order based on items
  return this.items.map(item => `${item.quantity} x ${item.name}`).join(', ');
});

// Optional: To include virtuals when converting to JSON
orderSchema.set('toJSON', { virtuals: true });
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
