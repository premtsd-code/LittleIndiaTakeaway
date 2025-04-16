const axios = require('axios');

exports.getDashboardData = async (req, res) => {
  try {
    console.log("You hit the dashboard api");

    const allOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfOrders'); // Replace with the actual URL of your API
    const allOrders = allOrdersResponse.data;
    console.log("You hit the dashboard api");
    const pendingOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfPendingOrders'); // Replace with the actual URL of your API
    const pendingOrders = pendingOrdersResponse.data;
    console.log("You hit the dashboard api");
    const completedOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfCompletedOrders'); // Replace with the actual URL of your API
    const completedOrders = completedOrdersResponse.data;
    console.log("You hit the dashboard api");
    const onHoldOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders//totalCountOfOnholdOrders'); // Replace with the actual URL of your API
    const onHoldOrders = onHoldOrdersResponse.data;

    console.log("You hit the dashboard api");

    const top5PendingOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders/top5pending'); // Replace with the actual URL of your API
    const top5PendingOrders = top5PendingOrdersResponse.data;
    console.log("You hit the dashboard api");

    const top5CompletedOrdersResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/orders/top5completed'); // Replace with the actual URL of your API
    const top5CompletedOrders = top5CompletedOrdersResponse.data;
    console.log("You hit the dashboard api");

    const availableSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/available'); // Replace with the actual URL of your API
    const availableSlots = availableSlotsResponse.data;
    console.log("You hit the dashboard api");

    const blockedSlotsResponse = await axios.get('https://littleindia-f52f947eb8a9.herokuapp.com/api/deliveryslots/blocked'); // Replace with the actual URL of your API
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
