const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get all orders for a specific user by their userId
router.get('/userOrder/:userId', orderController.getAllOrdersForUser);

// Route to update an existing order by orderId
router.put('/updateOrder/:orderId', orderController.updateOrder);

// Route to get the top 5 pending orders
router.get('/top5pending', orderController.getTop5PendingOrders);

// Route to get the top 5 completed orders
router.get('/top5completed', orderController.getTop5CompletedOrders);

// Route to get the total count of all orders
router.get('/totalCountOfOrders', orderController.getTotalOrderCount);

// Route to get the total count of pending orders
router.get('/totalCountOfPendingOrders', orderController.getTotalPendingOrdersCount);

// Route to get the total count of completed orders
router.get('/totalCountOfCompletedOrders', orderController.getTotalCompletedOrdersCount);

// Route to get the total count of on-hold orders
router.get('/totalCountOfOnholdOrders', orderController.getTotalOnHoldOrdersCount);

module.exports = router;
