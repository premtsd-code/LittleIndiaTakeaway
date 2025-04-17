const axios = require('axios');

// Define the base URL for the API
const BASE_URL = 'https://littleindia-f52f947eb8a9.herokuapp.com';

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch total number of all orders
    const allOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfOrders`);
    const allOrders = allOrdersResponse.data;

    // Fetch total number of pending orders
    const pendingOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfPendingOrders`);
    const pendingOrders = pendingOrdersResponse.data;

    // Fetch total number of completed orders
    const completedOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfCompletedOrders`);
    const completedOrders = completedOrdersResponse.data;

    // Fetch total number of on-hold orders
    const onHoldOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfOnholdOrders`);
    const onHoldOrders = onHoldOrdersResponse.data;

    // Fetch the top 5 most recent pending orders
    const top5PendingOrdersResponse = await axios.get(`${BASE_URL}/api/orders/top5pending`);
    const top5PendingOrders = top5PendingOrdersResponse.data;

    // Fetch the top 5 most recent completed orders
    const top5CompletedOrdersResponse = await axios.get(`${BASE_URL}/api/orders/top5completed`);
    const top5CompletedOrders = top5CompletedOrdersResponse.data;

    // Fetch available delivery time slots
    const availableSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/available`);
    const availableSlots = availableSlotsResponse.data;

    // Fetch blocked (unavailable) delivery time slots
    const blockedSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/blocked`);
    const blockedSlots = blockedSlotsResponse.data;

    // Send all the fetched data as a JSON response to the client
    res.status(200).json({
      allOrders,
      pendingOrders,
      completedOrders,
      onHoldOrders,
      top5PendingOrders,
      top5CompletedOrders,
      availableSlots,
      blockedSlots
    });
  } catch (err) {
    // If there is an error during the API calls, send a 500 error with a message
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
