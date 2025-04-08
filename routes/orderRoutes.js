const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import the controller

// POST route to create a new order
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);  
router.put('/updateOrder/:orderId', orderController.updateOrder);



module.exports = router;
