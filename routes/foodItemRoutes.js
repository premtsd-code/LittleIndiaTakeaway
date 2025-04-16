const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/create', authMiddleware('owner'), foodItemController.createFoodItem);
router.get('/', foodItemController.getAllFoodItems);
router.put('/:itemId', authMiddleware('owner'), foodItemController.updateFoodItem);
router.delete('/:itemId', authMiddleware('owner'), foodItemController.deleteFoodItem);
router.get('/:itemId', foodItemController.getOneFoodItem);
router.post('/visibility', authMiddleware('owner'), foodItemController.bulkUpdateVisibility);

module.exports = router;
