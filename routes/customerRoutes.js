const express = require('express');
const router = express.Router();
const customer = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Route to get the published menu
router.get('/menu', customer.getPublishedMenu);

// Route to place an order
router.post('/placeOrder', orderController.placeOrder);

module.exports = router;
