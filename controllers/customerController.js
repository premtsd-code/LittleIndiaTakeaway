const Order = require('../models/Order');
const DeliverySlot = require('../models/DeliverySlot');
const FoodItem = require('../models/FoodItem');

exports.getPublishedMenu = async (req, res) => {
  const items = await FoodItem.find({ status: 'published' });
  res.json(items);
};

exports.placeOrder = async (req, res) => {
  const { customerId, slotId, items } = req.body;

  const slot = await DeliverySlot.findById(slotId);
  if (!slot || slot.availableSlots <= 0) return res.status(400).json({ error: 'Slot unavailable' });

  let totalPrice = 0;
  for (let i of items) {
    const item = await FoodItem.findById(i.foodItemId);
    totalPrice += item.price * i.quantity;
  }

  const order = new Order({ customerId, deliverySlotId: slotId, items, totalPrice });
  await order.save();

  slot.availableSlots -= 1;
  await slot.save();

  res.json({ message: 'Order placed successfully.' });
};
