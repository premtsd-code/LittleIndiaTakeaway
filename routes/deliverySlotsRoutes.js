const express = require('express');
const router = express.Router();

const deliverySlotController = require('../controllers/deliverySlotController'); 

router.get('/', deliverySlotController.getAllDeliverySlots);

router.put('/openCloseRestaurant/:day', deliverySlotController.openCloseRestaurant);

router.patch('/:day/toggle/:time', deliverySlotController.toggleTimeSlot);

router.get('/available', deliverySlotController.getAvailableTimeSlots);

router.put('/saveSchedule', deliverySlotController.toggleDeliverySlots);




module.exports = router;
