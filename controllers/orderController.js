const Order = require('../models/OrderSchema');
const DeliverySlot = require('../models/DeliverySlot');
const FoodItem = require('../models/FoodItem');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  console.log("hello hello, this is second clone");

  const { customer, type, timeSlot, items } = req.body;

  try {

    const orderId = `ORD${Math.floor(Math.random() * 100000)}`;


    const newOrder = new Order({
      orderId,
      customer,
      type,
      timeSlot,
      items,
    });


    await newOrder.save();


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
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;

  try {

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { $set: updateData },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }


    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Error updating order', details: err.message });
  }
};


exports.placeOrder = async (req, res) => {
  const {
    customer, type, timeSlot, items, discount, shipping, subtotal, terms, total,
    address, county, eircode, email, phone, userId,
  } = req.body;


  if (!customer || !type || !items || !subtotal || !total || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }


  if (type === 'Delivery') {
    if (!address || !county || !eircode) {
      return res.status(400).json({ error: 'Address, county, and eircode are required for Delivery' });
    }
  }


  let user;
  try {
    user = await User.findOne({ userID: userId });
    if (!user) {
      return res.status(400).json({ error: `User with userId ${userId} not found` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error finding user', message: err.message });
  }


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




  try {
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


    await order.save();


    return res.status(201).json({
      message: 'Order placed successfully',
      order: order,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error placing the order', message: error.message });
  }
};



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
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

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



exports.getAllOrdersForUser = async (req, res) => {
  const { userId } = req.params;
  try {

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

    const orders = await Order.find({ userId: user._id });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }


    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders for user:', err);
    res.status(500).json({ error: 'Error fetching orders for this user' });
  }
};
