const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new food item (Only accessible by 'owner' role)
router.post('/create', authMiddleware('owner'), foodItemController.createFoodItem);

// Route to get all food items
router.get('/', foodItemController.getAllFoodItems);

// Route to update an existing food item by ID (Only accessible by 'owner' role)
router.put('/:itemId', authMiddleware('owner'), foodItemController.updateFoodItem);

// Route to delete a food item by ID (Only accessible by 'owner' role)
router.delete('/:itemId', authMiddleware('owner'), foodItemController.deleteFoodItem);

// Route to get a single food item by ID
router.get('/:itemId', foodItemController.getOneFoodItem);

// Route for bulk updating the visibility of food items (Only accessible by 'owner' role)
router.post('/visibility', authMiddleware('owner'), foodItemController.bulkUpdateVisibility);

module.exports = router;
