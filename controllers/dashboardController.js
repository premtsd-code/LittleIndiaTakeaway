const axios = require('axios'); // You can use axios to make internal HTTP requests (for simplicity)

// Combined Dashboard API
exports.getDashboardData = async (req, res) => {
  try {
    console.log("You hit the dashboard api");
    // Fetch All Orders using the existing orders API
    const allOrdersResponse = await axios.get('http://localhost:3000/api/orders//totalCountOfOrders'); // Replace with the actual URL of your API
    const allOrders = allOrdersResponse.data;
    console.log(allOrders);

    const pendingOrdersResponse = await axios.get('http://localhost:3000/api/orders//totalCountOfPendingOrders'); // Replace with the actual URL of your API
    const pendingOrders = pendingOrdersResponse.data;
    console.log(pendingOrders);

    const completedOrdersResponse = await axios.get('http://localhost:3000/api/orders//totalCountOfCompletedOrders'); // Replace with the actual URL of your API
    const completedOrders = completedOrdersResponse.data;
    console.log(completedOrders);

    const onHoldOrdersResponse = await axios.get('http://localhost:3000/api/orders//totalCountOfOnholdOrders'); // Replace with the actual URL of your API
    const onHoldOrders = onHoldOrdersResponse.data;
    console.log(onHoldOrders);


    // Fetch Top 5 Pending Orders using the existing API
    const top5PendingOrdersResponse = await axios.get('http://localhost:3000/api/orders/top5pending'); // Replace with the actual URL of your API
    const top5PendingOrders = top5PendingOrdersResponse.data;
    console.log(top5PendingOrders);

    // Fetch Top 5 Completed Orders using the existing API
    const top5CompletedOrdersResponse = await axios.get('http://localhost:3000/api/orders/top5completed'); // Replace with the actual URL of your API
    const top5CompletedOrders = top5CompletedOrdersResponse.data;
    console.log(top5CompletedOrders);

    // Fetch Available Time Slots using the existing API
    const availableSlotsResponse = await axios.get('http://localhost:3000/api/deliveryslots/available'); // Replace with the actual URL of your API
    const availableSlots = availableSlotsResponse.data;
    console.log(availableSlots);

    // Fetch Blocked Time Slots using the existing API
    const blockedSlotsResponse = await axios.get('http://localhost:3000/api/deliveryslots/blocked'); // Replace with the actual URL of your API
    const blockedSlots = blockedSlotsResponse.data;
    console.log(blockedSlots);

    // Return all the combined data in the response
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
