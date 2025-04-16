const express = require('express');
const router = express.Router();
const customer = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.get('/menu', customer.getPublishedMenu);
router.post('/placeOrder', orderController.placeOrder);

module.exports = router;
