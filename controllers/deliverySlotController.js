const DeliverySlot = require('../models/DeliverySlot');



//to gather all the delivery slots
exports.getAllDeliverySlots = async (req, res) => {
  try {
    const deliverySlots = await DeliverySlot.find();
    console.log(deliverySlots);
    res.status(200).json(deliverySlots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch delivery slots' });
  }
};


//to mark restaurant as open on a given day
exports.openCloseRestaurant = async (req, res) => {
  const { day } = req.params;
  try {
    const deliverySlot = await DeliverySlot.findOne({ day });

    if (!deliverySlot) {
      return res.status(404).json({ error: 'Delivery slot not found for this day' });
    }

    deliverySlot.isOpen = !deliverySlot.isOpen;


    await deliverySlot.save();

    res.status(200).json({
      message: `Restaurant for ${day} has been ${deliverySlot.isOpen ? 'opened' : 'closed'}`,
      updatedSlot: deliverySlot
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle the restaurant status' });
  }
};


//to toggle any time slot on a given day
exports.toggleTimeSlot = async (req, res) => {
  const { day, time } = req.params;

  try {

    const deliverySlot = await DeliverySlot.findOne({ day });
    if (!deliverySlot) {
      return res.status(404).json({ error: 'Delivery slot not found for the specified day' });
    }


    const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }


    timeSlot.available = !timeSlot.available;


    await deliverySlot.save();

    res.status(200).json({ message: `Time slot for ${time} on ${day} toggled successfully`, timeSlot });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle time slot' });
  }
};


//get all available time slots of current day
exports.getAvailableTimeSlots = async (req, res) => {
  try {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];



    const deliverySlot = await DeliverySlot.findOne({ day: currentDay });

    if (!deliverySlot) {
      return res.status(404).json({ message: 'No delivery slot found for today' });
    }


    const availableTimeSlots = deliverySlot.timeSlots.filter(slot => slot.available);

    res.status(200).json({
      day: currentDay,
      availableTimeSlots: availableTimeSlots
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch available time slots' });
  }
};


//get all blocked time slots of current day
exports.getBlockedTimeSlots = async (req, res) => {
  try {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];


    const deliverySlot = await DeliverySlot.findOne({ day: currentDay });

    if (!deliverySlot) {
      return res.status(404).json({ message: 'No delivery slot found for today' });
    }


    const blockedTimeSlots = deliverySlot.timeSlots.filter(slot => !slot.available);

    res.status(200).json({
      day: currentDay,
      blockedTimeSlots: blockedTimeSlots
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch available time slots' });
  }
};


//api to save schedule
exports.toggleDeliverySlots = async (req, res) => {
  const daysData = req.body;
  console.log(daysData);

  if (!Array.isArray(daysData)) {
    return res.status(400).json({ error: 'Invalid input format. Expected an array.' });
  }
  try {

    for (const dayData of daysData) {
      const { day, timeSlots } = dayData;


      const deliverySlot = await DeliverySlot.findOne({ day });

      if (!deliverySlot) {
        return res.status(404).json({ message: `No delivery slot found for ${day}` });
      }


      if (!timeSlots) {

        deliverySlot.isOpen = false;
        deliverySlot.timeSlots.forEach(slot => {
          slot.available = false;
        });
      } else {
        deliverySlot.isOpen = true;
        for (const time of timeSlots) {
          const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
          if (timeSlot) {
            timeSlot.available = true;
          }
        }
      }


      await deliverySlot.save();
    }

    res.status(200).json({ message: 'Delivery slots updated successfully' });

  } catch (err) {
    console.error('Error updating delivery slots:', err);
    res.status(500).json({ error: 'Failed to update delivery slots' });
  }
};