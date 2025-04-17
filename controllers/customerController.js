const Order = require('../models/OrderSchema');
const DeliverySlot = require('../models/DeliverySlot');
const FoodItem = require('../models/FoodItem');

// Controller to get the published (visible) food menu
exports.getPublishedMenu = async (req, res) => {
  try {
    // Find food items that are visible to customers (isVisible is true)
    const items = await FoodItem.find({ isVisible: true });

    // Return the found food items as a response
    res.json(items);
  } catch (err) {
    // Handle any errors that occur during the retrieval of food items
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

// Controller to place an order
exports.placeOrder = async (req, res) => {
  const { customerId, slotId, items } = req.body;

  try {
    // Find the delivery slot by its ID
    const slot = await DeliverySlot.findById(slotId);

    // Check if the slot exists and if there are available slots left
    if (!slot || slot.availableSlots <= 0) {
      return res.status(400).json({ error: 'Slot unavailable' });
    }

    // Initialize total price
    let totalPrice = 0;

    // Loop through the ordered items to calculate the total price
    for (let i of items) {
      // Find each food item by its ID
      const item = await FoodItem.findById(i.foodItemId);
      
      // Calculate the price for the item based on its quantity and add it to the total price
      totalPrice += item.price * i.quantity;
    }

    // Create a new order with the provided data (customer, slot, items, total price)
    const order = new Order({
      customerId,
      deliverySlotId: slotId,
      items,
      totalPrice,
    });

    // Save the new order to the database
    await order.save();

    // Reduce the available slots for the delivery slot by 1 (since a new order is placed)
    slot.availableSlots -= 1;

    // Save the updated delivery slot with the new available slots
    await slot.save();

    // Send a success message with the response
    res.json({ message: 'Order placed successfully.' });
  } catch (err) {
    // Handle any errors that occur during the order placement process
    res.status(500).json({ error: 'Failed to place order', message: err.message });
  }
};
