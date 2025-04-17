const Order = require('../models/OrderSchema');
const DeliverySlot = require('../models/DeliverySlot');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');


//api to place an order
exports.createOrder = async (req, res) => {
 

  const { customer, type, timeSlot, items } = req.body;

  try {
    // Generate a unique order ID
    const orderId = `ORD${Math.floor(Math.random() * 100000)}`;

    // Create a new order instance with the provided details
    const newOrder = new Order({
      orderId,
      customer,
      type,
      timeSlot,
      items,
    });

    // Save the new order to the database
    await newOrder.save();

    // Respond with the success message and order data
    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

<<<<<<< HEAD
// Retrieve all orders
=======

//api to get all the orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Update an existing order by orderId
=======

//api to update status of an order
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;

  try {
    // Update the order with the provided data
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { $set: updateData },
      { new: true }
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

<<<<<<< HEAD
// Place an order
=======


>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.placeOrder = async (req, res) => {
  const {
    customer, type, timeSlot, items, discount, shipping, subtotal, terms, total,
    address, county, eircode, email, phone, userId,
  } = req.body;

  // Validate required fields
  if (!customer || !type || !items || !subtotal || !total || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate delivery address for Delivery orders
  if (type === 'Delivery') {
    if (!address || !county || !eircode) {
      return res.status(400).json({ error: 'Address, county, and eircode are required for Delivery' });
    }
  }

  let user;
  try {
    // Find the user by userId
    user = await User.findOne({ userID: userId });
    if (!user) {
      return res.status(400).json({ error: `User with userId ${userId} not found` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error finding user', message: err.message });
  }

  // Map ordered items to include name, price, and quantity
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

  // Get the current day and check for available time slots
  let date = new Date();
  let day = date.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const deliverySlot = await DeliverySlot.findOne({ day: daysOfWeek[day] });

  if (type === 'Delivery') {
    if (deliverySlot) {
      let timeSlotFound = false;
      // Check for the selected time slot and mark it as unavailable
      deliverySlot.timeSlots.forEach(slot => {
        if (slot.time === timeSlot && slot.available == true) {
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
  }

  try {
    // Create a new order instance
    const order = new Order({
      customer,
      userId: user._id,
      type,
      timeSlot,
      items: itemDetails,
      status: 'Pending',
      dateTime: new Date(),
      address: type === 'Delivery' ? address : undefined,
      county: type === 'Delivery' ? county : undefined,
      eircode: type === 'Delivery' ? eircode : undefined,
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

    // Respond with the created order data
    return res.status(201).json({
      message: 'Order placed successfully',
      order: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error placing the order', message: error.message });
  }
};

<<<<<<< HEAD
// Get the total count of orders
=======

//api to get the total number of orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTotalOrderCount = async (req, res) => {
  try {
    const orders = await Order.find();
    const size = orders.length;
    res.status(200).json({
      countOfOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Get the total count of pending orders
=======

//api to get the total number of pending orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTotalPendingOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Pending' });
    const size = orders.length;
    res.status(200).json({
      countOfPendingOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Get the total count of completed orders
=======
//api to get the total number of completed orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTotalCompletedOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'Completed' });
    const size = orders.length;
    res.status(200).json({
      countOfCompletedOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Get the total count of on-hold orders
=======
//api to get the total number of on-hold orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTotalOnHoldOrdersCount = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'OnHold' });
    const size = orders.length;
    res.status(200).json({
      countOfOnHoldOrders: size,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Get all orders
=======
//api to view all the orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

<<<<<<< HEAD
// Get top 5 pending orders (most recent)
=======

//api to view the top 5 pending orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTop5PendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({ status: 'Pending' })
      .sort({ dateTime: -1 })
      .limit(5);

    if (pendingOrders.length === 0) {
      return res.status(404).json({ message: 'No pending orders found' });
    }

    res.status(200).json(pendingOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending orders' });
  }
};

<<<<<<< HEAD
// Get top 5 completed orders (most recent)
=======
//api to view the top 5 completed orders
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getTop5CompletedOrders = async (req, res) => {
  try {
    const completedOrders = await Order.find({ status: 'Completed' })
      .sort({ dateTime: -1 })
      .limit(5);

    if (completedOrders.length === 0) {
      return res.status(404).json({ message: 'No completed orders found' });
    }

    res.status(200).json(completedOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch completed orders' });
  }
};

<<<<<<< HEAD
// Get all orders for a specific user
=======

//api to get all orders based on user id
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
exports.getAllOrdersForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId
    let user;
    try {
      user = await User.findOne({ userID: userId });
      if (!user) {
        return res.status(400).json({ error: `User with userId ${userId} not found` });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Error finding user', message: err.message });
    }

    // Fetch all orders placed by the user
    const orders = await Order.find({ userId: user._id });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    // Respond with the user's orders
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders for user:', err);
    res.status(500).json({ error: 'Error fetching orders for this user' });
  }
};
