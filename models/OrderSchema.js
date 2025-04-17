const mongoose = require('mongoose');
const DeliverySlot = require('./DeliverySlot');

// Item schema for each ordered item
const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },    // Unique ID for each item
  name: { type: String, required: true },   // Name of the food item
  quantity: { type: Number, required: true }, // Quantity of the item ordered
  price: { type: Number, required: true },  // Price of the item
});

// Order schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: function () {
      // Generate a unique order ID (e.g., ORD12345)
      return 'ORD' + Math.floor(Math.random() * 100000);
    },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User schema (who placed the order)
  customer: { type: String, required: true },  // Name of the customer placing the order
  type: { type: String, enum: ['Delivery', 'Takeaway'], required: true },  // Type of order, either Delivery or Takeaway
  timeSlot: { type: String, default: null },  // Optional time slot for delivery (for delivery orders)
  status: { type: String, enum: ['Pending', 'Delivered', 'OnHold'], default: 'Pending' },  // Order status (Pending, Delivered, OnHold)
  dateTime: { type: Date, default: Date.now }, // Date and time the order was placed
  items: [itemSchema],  // Array of items ordered
  address: { type: String, required: function () { return this.type === 'Delivery'; } },  // Address required for delivery orders only
  county: { type: String, required: function () { return this.type === 'Delivery'; } },  // County for delivery orders only
  eircode: { type: String, required: function () { return this.type === 'Delivery'; } },  // Eircode (postal code) for delivery orders only
  email: { type: String, required: true },  // Customer's email address
  phone: { type: String, required: true },  // Customer's phone number
  discount: { type: Number, default: 0 },  // Discount applied to the order (if any)
  shipping: { type: Number, required: true },  // Shipping fee for delivery
  subtotal: { type: Number, required: true },  // Subtotal before discount and shipping
  terms: { type: Boolean, required: true },  // Whether the customer agrees to terms and conditions
  total: { type: Number, required: true },  // Total order amount after discount and shipping
});

// Virtual field to get a human-readable description of the order
orderSchema.virtual('description').get(function () {
  return this.items.map(item => `${item.quantity} x ${item.name}`).join(', ');  // e.g., "2 x Biriyani, 1 x IceCream"
});

// Ensures virtual fields are included when converting to JSON
orderSchema.set('toJSON', { virtuals: true });

// Create the Order model from the schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
