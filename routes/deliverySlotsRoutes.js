const express = require('express');
const router = express.Router();

const deliverySlotController = require('../controllers/deliverySlotController');

// Route to get all delivery slots
router.get('/', deliverySlotController.getAllDeliverySlots);

// Route to open or close the restaurant for a specific day
router.put('/openCloseRestaurant/:day', deliverySlotController.openCloseRestaurant);

// Route to toggle the availability of a specific time slot for a given day
router.patch('/:day/toggle/:time', deliverySlotController.toggleTimeSlot);

// Route to get available time slots
router.get('/available', deliverySlotController.getAvailableTimeSlots);

// Route to save or toggle the delivery slots schedule
router.put('/saveSchedule', deliverySlotController.toggleDeliverySlots);

// Route to get blocked time slots
router.get('/blocked', deliverySlotController.getBlockedTimeSlots);

module.exports = router;
