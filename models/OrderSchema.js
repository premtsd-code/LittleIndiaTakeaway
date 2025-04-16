const mongoose = require('mongoose');
const DeliverySlot = require('./DeliverySlot');
const itemSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: function () {
      return 'ORD' + Math.floor(Math.random() * 100000);
    },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  customer: { type: String, required: true },  
  type: { type: String, enum: ['Delivery', 'Takeaway'], required: true },  
  timeSlot: { type: String, default: null },  
  status: { type: String, enum: ['Pending', 'Delivered', 'OnHold'], default: 'Pending' },  
  dateTime: { type: Date, default: Date.now },
  items: [itemSchema],  
  address: { type: String, required: function () { return this.type === 'Delivery'; } },  
  county: { type: String, required: function () { return this.type === 'Delivery'; } },  
  eircode: { type: String, required: function () { return this.type === 'Delivery'; } },  
  email: { type: String, required: true },  
  phone: { type: String, required: true }, 
  discount: { type: Number, default: 0 },  
  shipping: { type: Number, required: true },  
  subtotal: { type: Number, required: true },  
  terms: { type: Boolean, required: true }, 
  total: { type: Number, required: true },  
});

orderSchema.virtual('description').get(function () {
  return this.items.map(item => `${item.quantity} x ${item.name}`).join(', ');
});

orderSchema.set('toJSON', { virtuals: true });
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
