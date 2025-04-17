const axios = require('axios');

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
    const top5PendingOrders = top5PendingOrdersResponse.data;
    console.log("You hit the dashboard api");

    const top5CompletedOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders/top5completed'); 
    const top5CompletedOrders = top5CompletedOrdersResponse.data;
    console.log("You hit the dashboard api");

    const availableSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/available'); 
    const availableSlots = availableSlotsResponse.data;
    console.log("You hit the dashboard api");

    const blockedSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/blocked'); 
    const blockedSlots = blockedSlotsResponse.data;
    console.log("You hit the dashboard api");

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
