const express = require('express');
const router = express.Router();
const foodItemController = require('../controllers/foodItemController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/fooditems/create:
 *   post:
 *     summary: Create a new food item
 *     description: Allows the owner to create a new food item in the restaurant menu.
 *     tags:
 *       - Food Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - imageURL
 *               - isVisible
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the food item.
 *               description:
 *                 type: string
 *                 description: The description of the food item.
 *               price:
 *                 type: number
 *                 description: The price of the food item.
 *               category:
 *                 type: string
 *                 enum:
 *                   - STARTERS
 *                   - MAINCOURSE
 *                   - DESSERTS
 *                   - DRINKS
 *                 description: The category of the food item.
 *               imageURL:
 *                 type: string
 *                 description: URL of the food item image.
 *               isVisible:
 *                 type: boolean
 *                 description: Whether the food item is visible to customers or not.
 *     responses:
 *       201:
 *         description: Food item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Food item created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d3b41f3f5f6f1f48223b22
 *                     name:
 *                       type: string
 *                       example: "Cheese Pizza"
 *                     description:
 *                       type: string
 *                       example: "A delicious cheese pizza with mozzarella and cheddar."
 *                     price:
 *                       type: number
 *                       example: 9.99
 *                     category:
 *                       type: string
 *                       example: "MAINCOURSE"
 *                     imageURL:
 *                       type: string
 *                       example: "http://example.com/images/cheese-pizza.jpg"
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input"
 */
router.post('/create', authMiddleware('owner'), foodItemController.createFoodItem);

/**
 * @swagger
 * /api/fooditems/:
 *   get:
 *     summary: Get all food items
 *     description: Allows customers to view all available food items from the menu.
 *     tags:
 *       - Food Items
 *     responses:
 *       200:
 *         description: A list of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d3b41f3f5f6f1f48223b22
 *                       name:
 *                         type: string
 *                         example: "Cheese Pizza"
 *                       description:
 *                         type: string
 *                         example: "A delicious cheese pizza with mozzarella and cheddar."
 *                       price:
 *                         type: number
 *                         example: 9.99
 *                       category:
 *                         type: string
 *                         example: "MAINCOURSE"
 *                       imageURL:
 *                         type: string
 *                         example: "http://example.com/images/cheese-pizza.jpg"
 *                       isVisible:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Internal server error
 */
router.get('/', foodItemController.getAllFoodItems);

/**
 * @swagger
 * /api/fooditems/{itemId}:
 *   put:
 *     summary: Update a food item
 *     description: Allows the owner to update an existing food item in the menu.
 *     tags:
 *       - Food Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the food item to update.
 *         schema:
 *           type: string
 *           example: 60d3b41f3f5f6f1f48223b22
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the food item.
 *               description:
 *                 type: string
 *                 description: The description of the food item.
 *               price:
 *                 type: number
 *                 description: The price of the food item.
 *               category:
 *                 type: string
 *                 enum:
 *                   - STARTERS
 *                   - MAINCOURSE
 *                   - DESSERTS
 *                   - DRINKS
 *                 description: The category of the food item.
 *               imageURL:
 *                 type: string
 *                 description: URL of the food item image.
 *               isVisible:
 *                 type: boolean
 *                 description: Whether the food item is visible to customers or not.
 *     responses:
 *       200:
 *         description: Food item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Food item updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d3b41f3f5f6f1f48223b22"
 *                     name:
 *                       type: string
 *                       example: "Spicy Cheese Pizza"
 *                     description:
 *                       type: string
 *                       example: "A spicy version of the classic cheese pizza."
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     category:
 *                       type: string
 *                       example: "MAINCOURSE"
 *                     imageURL:
 *                       type: string
 *                       example: "http://example.com/images/spicy-cheese-pizza.jpg"
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Food item not found
 */
router.put('/:itemId', authMiddleware('owner'), foodItemController.updateFoodItem);

/**
 * @swagger
 * /api/fooditems/{itemId}:
 *   delete:
 *     summary: Delete a food item
 *     description: Allows the owner to delete a specific food item from the menu.
 *     tags:
 *       - Food Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the food item to delete.
 *         schema:
 *           type: string
 *           example: 60d3b41f3f5f6f1f48223b22
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Food item deleted successfully"
 *       404:
 *         description: Food item not found
 */
router.delete('/:itemId', authMiddleware('owner'), foodItemController.deleteFoodItem);


/**
 * @swagger
 * /api/fooditems/{itemId}:
 *   get:
 *     summary: Get a food item by ID
 *     description: Allows customers to get a specific food item from the menu using the item's ID.
 *     tags:
 *       - Food Items
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the food item to retrieve.
 *         schema:
 *           type: string
 *           example: 60d3b41f3f5f6f1f48223b22
 *     responses:
 *       200:
 *         description: A single food item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d3b41f3f5f6f1f48223b22"
 *                     name:
 *                       type: string
 *                       example: "Cheese Pizza"
 *                     description:
 *                       type: string
 *                       example: "A delicious cheese pizza with mozzarella and cheddar."
 *                     price:
 *                       type: number
 *                       example: 9.99
 *                     category:
 *                       type: string
 *                       example: "MAINCOURSE"
 *                     imageURL:
 *                       type: string
 *                       example: "http://example.com/images/cheese-pizza.jpg"
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:itemId', foodItemController.getOneFoodItem);

module.exports = router;
