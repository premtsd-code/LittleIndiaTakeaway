const express = require('express');
const router = express.Router();
const customer = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');

router.get('/menu', customer.getPublishedMenu);
router.post('/order', auth(['customer']), customer.placeOrder);

module.exports = router;
