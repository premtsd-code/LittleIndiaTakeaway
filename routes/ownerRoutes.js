const express = require('express');
const router = express.Router();
const owner = require('../controllers/ownerController');
const auth = require('../middleware/authMiddleware');

router.post('/add-food', auth(['owner']), owner.addFoodItem);
router.put('/publish-food/:itemId', auth(['owner']), owner.publishFoodItem);
router.post('/add-slot', auth(['owner']), owner.addDeliverySlot);

module.exports = router;
