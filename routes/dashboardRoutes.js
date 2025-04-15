const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Assuming your controller is in controllers/dashboardController.js

// Route to get the dashboard data (combined API)
router.get('/dashboard', dashboardController.getDashboardData);

module.exports = router;
