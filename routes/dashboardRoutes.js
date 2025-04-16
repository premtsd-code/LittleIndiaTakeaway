const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Assuming your controller is in controllers/dashboardController.js

router.get('/', dashboardController.getDashboardData);

module.exports = router;
