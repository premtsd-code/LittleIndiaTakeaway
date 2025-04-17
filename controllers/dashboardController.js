const axios = require('axios');

// Define the base URL
const BASE_URL = 'https://littleindia-f52f947eb8a9.herokuapp.com';

exports.getDashboardData = async (req, res) => {
  try {
    // Use the base URL and append specific endpoints for each API call
    const allOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfOrders`);
    const allOrders = allOrdersResponse.data;

    const pendingOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfPendingOrders`);
    const pendingOrders = pendingOrdersResponse.data;

    const completedOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfCompletedOrders`);
    const completedOrders = completedOrdersResponse.data;

    const onHoldOrdersResponse = await axios.get(`${BASE_URL}/api/orders/totalCountOfOnholdOrders`);
    const onHoldOrders = onHoldOrdersResponse.data;

    const top5PendingOrdersResponse = await axios.get(`${BASE_URL}/api/orders/top5pending`);
    const top5PendingOrders = top5PendingOrdersResponse.data;

    const top5CompletedOrdersResponse = await axios.get(`${BASE_URL}/api/orders/top5completed`);
    const top5CompletedOrders = top5CompletedOrdersResponse.data;

    const availableSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/available`);
    const availableSlots = availableSlotsResponse.data;

    const blockedSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/blocked`);
    const blockedSlots = blockedSlotsResponse.data;

    // Respond with the data
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
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
