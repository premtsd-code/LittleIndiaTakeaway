const Order = require('../models/OrderSchema');

// Function to create a new order
exports.createOrder = async (req, res) => {
    console.log("hello hello, this is second clone");
  const { customer, type, timeSlot, items } = req.body; // Extract data from the request body

  try {
    // Generate a new orderId (you can adjust this logic if necessary)
    const orderId = `ORD${Math.floor(Math.random() * 100000)}`;

    // Create a new order object
    const newOrder = new Order({
      orderId,
      customer,
      type,
      timeSlot,
      items
    });

    // Save the order to the database
    await newOrder.save();

    // Send the response with the newly created order
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();  // This will fetch all orders from the database
    res.status(200).json(orders);       // Send the orders as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};


exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;  // Get orderId from request params
  const updateData = req.body;  // Get the fields to update from the request body

  try {
    // Find the order by orderId and update it
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },  // Filter by orderId
      { $set: updateData },   // Update fields passed in request body
      { new: true }           // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the updated order
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Error updating order', details: err.message });
  }
};

//dashboard apis :
exports.getTotalOrderCount = async (req, res) => {
  try {
    const orders = await Order.find();
    const size=orders.length;
    res.status(200).json({
      countOfOrders: size
    });       
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalPendingOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Pending' });
    const size=orders.length;
    res.status(200).json({
      countOfPendingOrders: size
    });       
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalCompletedOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Completed' });
    const size=orders.length;
    res.status(200).json({
      countOfCompletedOrders: size
    });       
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalOnHoldOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'OnHold' });
    const size=orders.length;
    res.status(200).json({
      countOfOnHoldOrders: size
    });       
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getAllOrders = async (req, res) => {
try {
  const orders = await Order.find();  // This will fetch all orders from the database
  res.status(200).json(orders);       // Send the orders as a JSON response
} catch (err) {
  res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
}
};


exports.getTop5PendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: 'Pending' })
      .sort({ dateTime: -1 }) // Sort by the most recent orders first
      .limit(5); // Limit to 5 orders

    if (pendingOrders.length === 0) {
      return res.status(404).json({ message: 'No pending orders found' });
    }

    res.status(200).json(pendingOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending orders' });
  }
};


exports.getTop5CompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: 'Completed' })
      .sort({ dateTime: -1 }) // Sort by the most recent orders first
      .limit(5); // Limit to 5 orders

    if (completedOrders.length === 0) {
      return res.status(404).json({ message: 'No completed orders found' });
    }

    res.status(200).json(completedOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch completed orders' });
  }
};