const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route to get dashboard data
router.get('/', dashboardController.getDashboardData);

module.exports = router;
