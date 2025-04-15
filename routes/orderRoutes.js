const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import the controller

// POST route to create a new order
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);  
router.put('/updateOrder/:orderId', orderController.updateOrder);

/**
 * @swagger
 * /placeOrder:
 *   post:
 *     summary: "Place an order"
 *     description: "This endpoint allows customers to place a new order."
 *     tags:
 *       - "Order"
 *     consumes:
 *       - "application/json"
 *     parameters:
 *       - in: "body"
 *         name: "order"
 *         description: "Order details"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customer:
 *               type: string
 *               example: "Anusha Chengi Vinodkumar"
 *               description: "Name of the customer."
 *             type:
 *               type: string
 *               enum: ["Delivery", "Takeaway"]
 *               example: "Delivery"
 *               description: "Type of order (Delivery or Takeaway)."
 *             timeSlot:
 *               type: string
 *               example: "9:00 AM"
 *               description: "Preferred time slot for the order (optional for Takeaway)."
 *             items:
 *               type: array
 *               description: "List of items being ordered."
 *               items:
 *                 type: object
 *                 properties:
 *                   uID:
 *                     type: string
 *                     example: "item001"
 *                     description: "Unique ID of the food item."
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *                     description: "Quantity of the item."
 *             discount:
 *               type: number
 *               example: 2
 *               description: "Discount applied to the order."
 *             shipping:
 *               type: number
 *               example: 3.5
 *               description: "Shipping fee for the order."
 *             subtotal:
 *               type: number
 *               example: 23.5
 *               description: "Total price of the items before discount and shipping."
 *             terms:
 *               type: boolean
 *               example: true
 *               description: "Whether the customer agrees to the terms and conditions."
 *             total:
 *               type: number
 *               example: 25
 *               description: "Total amount for the order after discount and shipping."
 *             address:
 *               type: string
 *               example: "Apartment 1, Ashley Hall, Saint Edmunds Park, Lucan"
 *               description: "Delivery address (only required for Delivery orders)."
 *             county:
 *               type: string
 *               example: "Kildare"
 *               description: "County of the delivery address (only required for Delivery orders)."
 *             eircode:
 *               type: string
 *               example: "W23 C6T0"
 *               description: "Eircode (postal code) of the delivery address (only required for Delivery orders)."
 *             email:
 *               type: string
 *               example: "anushachengi@gmail.com"
 *               description: "Email address of the customer."
 *             phone:
 *               type: string
 *               example: "0838614642"
 *               description: "Phone number of the customer."
 *             userId:
 *               type: string
 *               example: "60d3b41f3f5f6f1f48223b22"
 *               description: "User ID of the customer (UUID)."
 *     responses:
 *       201:
 *         description: "Order placed successfully."
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Order placed successfully"
 *             order:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: "ORD12345"
 *                   description: "The generated order ID."
 *                 customer:
 *                   type: string
 *                   example: "Anusha Chengi Vinodkumar"
 *                 type:
 *                   type: string
 *                   example: "Delivery"
 *                 timeSlot:
 *                   type: string
 *                   example: "9:00 AM"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       uID:
 *                         type: string
 *                         example: "item001"
 *                       quantity:
 *                         type: integer
 *                         example: 1
 *                       price:
 *                         type: number
 *                         example: 10
 *                 total:
 *                   type: number
 *                   example: 25
 *       400:
 *         description: "Bad request. Missing required fields or invalid data."
 *       500:
 *         description: "Internal server error."
 */

router.post('/placeOrder', orderController.placeOrder);

router.get('/top5pending', orderController.getTop5PendingOrders);
router.get('/top5completed', orderController.getTop5CompletedOrders);
router.get('/totalCountOfOrders', orderController.getTotalOrderCount);
router.get('/totalCountOfPendingOrders', orderController.getTotalPendingOrdersCount);
router.get('/totalCountOfCompletedOrders', orderController.getTotalCompletedOrdersCount);
router.get('/totalCountOfOnholdOrders', orderController.getTotalOnHoldOrdersCount);



module.exports = router;
