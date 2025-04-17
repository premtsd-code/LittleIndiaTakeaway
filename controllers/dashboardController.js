const axios = require('axios');

<<<<<<< HEAD
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
=======
//this is one api that hits all the apis required to gather information to be displayed on the admin dashboard - like current day's orders and slots.
exports.getDashboardData = async (req, res) => {
  try {
    console.log("You hit the dashboard api");

    const allOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfOrders'); 
    const allOrders = allOrdersResponse.data;
    console.log("You hit the dashboard api");
    const pendingOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfPendingOrders'); 
    const pendingOrders = pendingOrdersResponse.data;
    console.log("You hit the dashboard api");
    const completedOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfCompletedOrders'); 
    const completedOrders = completedOrdersResponse.data;
    console.log("You hit the dashboard api");
    const onHoldOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfOnholdOrders'); 
    const onHoldOrders = onHoldOrdersResponse.data;

    console.log("You hit the dashboard api");

    const top5PendingOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders/top5pending');
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
    const top5PendingOrders = top5PendingOrdersResponse.data;

<<<<<<< HEAD
    const top5CompletedOrdersResponse = await axios.get(`${BASE_URL}/api/orders/top5completed`);
=======
    const top5CompletedOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders/top5completed'); 
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
    const top5CompletedOrders = top5CompletedOrdersResponse.data;

<<<<<<< HEAD
    const availableSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/available`);
=======
    const availableSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/available'); 
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
    const availableSlots = availableSlotsResponse.data;

<<<<<<< HEAD
    const blockedSlotsResponse = await axios.get(`${BASE_URL}/api/deliveryslots/blocked`);
=======
    const blockedSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/blocked'); 
>>>>>>> ffffa997a6f61c83e5a2bb18ddcca0a8df581513
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
