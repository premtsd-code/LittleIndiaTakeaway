const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import the controller

// POST route to create a new order
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders); 
router.get('/userOrder/:userId', orderController.getAllOrdersForUser);  
router.put('/updateOrder/:orderId', orderController.updateOrder);

router.get('/top5pending', orderController.getTop5PendingOrders);
router.get('/top5completed', orderController.getTop5CompletedOrders);
router.get('/totalCountOfOrders', orderController.getTotalOrderCount);
router.get('/totalCountOfPendingOrders', orderController.getTotalPendingOrdersCount);
router.get('/totalCountOfCompletedOrders', orderController.getTotalCompletedOrdersCount);
router.get('/totalCountOfOnholdOrders', orderController.getTotalOnHoldOrdersCount);



module.exports = router;
