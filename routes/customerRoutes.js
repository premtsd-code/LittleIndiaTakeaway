const express = require('express');
const router = express.Router();
const customer = require('../controllers/customerController');
const auth = require('../middleware/authMiddleware');


/**
 * @swagger
 * /api/customer/menu:
 *   get:
 *     summary: Get all published menu items
 *     description: Returns a list of food items marked as visible.
 *     tags:
 *       - Customer Menu
 *     responses:
 *       200:
 *         description: A list of visible food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 */
router.get('/menu', customer.getPublishedMenu);
router.post('/order', auth(['customer']), customer.placeOrder);

module.exports = router;
