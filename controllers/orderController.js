const Order = require('../models/OrderSchema');
const DeliverySlot = require('../models/DeliverySlot');  // Import DeliverySlot model
const FoodItem = require('../models/FoodItem');  // Import FoodItem model
const User = require('../models/User');  // Import User model

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
      items,
    });

    // Save the order to the database
    await newOrder.save();

    // Send the response with the newly created order
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
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

// Place an order
exports.placeOrder = async (req, res) => {
  const {
    customer, type, timeSlot, items, discount, shipping, subtotal, terms, total,
    address, county, eircode, email, phone, userId,
  } = req.body;

  // Validate if all required fields are provided
  if (!customer || !type || !items || !subtotal || !total || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // If the order type is "Delivery", validate that address, county, and eircode are provided
  if (type === 'Delivery') {
    if (!address || !county || !eircode) {
      return res.status(400).json({ error: 'Address, county, and eircode are required for Delivery' });
    }
  }

  // Find the user by userId and ensure the user exists
  let user;
  try {
    user = await User.findOne({ userID: userId });
    if (!user) {
      return res.status(400).json({ error: `User with userId ${userId} not found` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error finding user', message: err.message });
  }

  // Map items_uID to actual food items
  const itemDetails = [];
  for (const item of items) {
    const foodItem = await FoodItem.findOne({ _id: item._id });
    if (!foodItem) {
      return res.status(400).json({ error: `Food item with uID ${item._id} not found` });
    }

    itemDetails.push({
      _id: item._id,
      name: foodItem.name,
      quantity: item.quantity,
      price: foodItem.price,
    });
  }

  let date = new Date();
  let day = date.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const deliverySlot = await DeliverySlot.findOne({ day: daysOfWeek[day] });

  if (deliverySlot) {
    let timeSlotFound = false;
    deliverySlot.timeSlots.forEach(slot => {
      if (slot.time === timeSlot && slot.available==true) {
        timeSlotFound = true;
        slot.available = false;
      }
    });
    if (timeSlotFound) {
      await deliverySlot.save(); 
    } else {
      return res.status(500).json({ error: 'Error placing the order', message: "TimeSlot not found" });
    }
  } else {
    return res.status(500).json({ error: 'Error placing the order', message: "TimeSlot Issue - No slot found for today" });
  }

  

  // Create a new order instance
  try {
    const order = new Order({
      customer,
      userId: user._id,  // Use the UUID (_id) of the user instead of userId
      type,
      timeSlot,
      items: itemDetails,
      status: 'Pending', // Default status
      dateTime: new Date(),
      address: type === 'Delivery' ? address : undefined,  // Only set address if Delivery
      county: type === 'Delivery' ? county : undefined,    // Only set county if Delivery
      eircode: type === 'Delivery' ? eircode : undefined,  // Only set eircode if Delivery
      email,
      phone,
      discount,
      shipping,
      subtotal,
      terms,
      total,
    });

    // Save the order to the database
    await order.save();

    // Send the response back with the order details
    return res.status(201).json({
      message: 'Order placed successfully',
      order: order,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error placing the order', message: error.message });
  }
};


// Dashboard APIs:
exports.getTotalOrderCount = async (req, res) => {
  try {
    const orders = await Order.find();
    const size = orders.length;
    res.status(200).json({
      countOfOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalPendingOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Pending' });
    const size = orders.length;
    res.status(200).json({
      countOfPendingOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalCompletedOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Completed' });
    const size = orders.length;
    res.status(200).json({
      countOfCompletedOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });  // Handle any errors that occur
  }
};

exports.getTotalOnHoldOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'OnHold' });
    const size = orders.length;
    res.status(200).json({
      countOfOnHoldOrders: size,
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



// Get all orders for a particular user
exports.getAllOrdersForUser = async (req, res) => {
  const { userId } = req.params;  // Extract the userId from the request parameters

  try {
    // Find orders that match the userId

    // Find the user by userId and ensure the user exists
    let user;
    try {
      user = await User.findOne({ userID: userId });
      if (!user) {
        return res.status(400).json({ error: `User with userId ${userId} not found` });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Error finding user', message: err.message });
    }

    console.log(user._id);

    const orders = await Order.find({ userId: user._id });  // Filtering by userId

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Return the found orders
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders for user:', err);
    res.status(500).json({ error: 'Error fetching orders for this user' });
  }
};
