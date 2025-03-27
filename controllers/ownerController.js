const FoodItem = require('../models/FoodItem');
const DeliverySlot = require('../models/DeliverySlot');

exports.addFoodItem = async (req, res) => {
  const { name, description, price, ownerId } = req.body;
  const foodItem = new FoodItem({ name, description, price, ownerId });
  await foodItem.save();
  res.json({ message: 'Food item added in draft mode.' });
};

exports.publishFoodItem = async (req, res) => {
  const { itemId } = req.params;
  await FoodItem.findByIdAndUpdate(itemId, { status: 'published' });
  res.json({ message: 'Food item published.' });
};

exports.addDeliverySlot = async (req, res) => {
  const { day, time, availableSlots, ownerId } = req.body;
  const slot = new DeliverySlot({ day, time, availableSlots, ownerId });
  await slot.save();
  res.json({ message: 'Delivery slot added.' });
};
