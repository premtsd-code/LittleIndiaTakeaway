const DeliverySlot = require('../models/DeliverySlot');

exports.getAllDeliverySlots = async (req, res) => {
  try {
    // Fetch all delivery slots from the database
    const deliverySlots = await DeliverySlot.find();
    console.log(deliverySlots);
    res.status(200).json(deliverySlots);  // Return the delivery slots as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch delivery slots' });
  }
};

// Open or close the restaurant for a specific day
exports.openCloseRestaurant = async (req, res) => {
  const { day } = req.params;  // Get the day from the route parameter

  try {
    // Find the delivery slot for the given day
    const deliverySlot = await DeliverySlot.findOne({ day });

    if (!deliverySlot) {
      return res.status(404).json({ error: 'Delivery slot not found for this day' });
    }

    // Toggle the isOpen status (open/close the restaurant for the day)
    deliverySlot.isOpen = !deliverySlot.isOpen;

    await deliverySlot.save();  // Save the updated delivery slot

    res.status(200).json({
      message: `Restaurant for ${day} has been ${deliverySlot.isOpen ? 'opened' : 'closed'}`,
      updatedSlot: deliverySlot  // Return the updated delivery slot information
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle the restaurant status' });
  }
};

// Toggle availability of a specific time slot for a specific day
exports.toggleTimeSlot = async (req, res) => {
  const { day, time } = req.params;  // Get the day and time from the route parameters

  try {
    // Find the delivery slot for the specified day
    const deliverySlot = await DeliverySlot.findOne({ day });
    if (!deliverySlot) {
      return res.status(404).json({ error: 'Delivery slot not found for the specified day' });
    }

    // Find the specific time slot for the given time
    const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
    if (!timeSlot) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    // Toggle the availability of the time slot (from true to false or vice versa)
    timeSlot.available = !timeSlot.available;

    await deliverySlot.save();  // Save the updated delivery slot

    res.status(200).json({ message: `Time slot for ${time} on ${day} toggled successfully`, timeSlot });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle time slot' });
  }
};

// Get all available time slots for the current day
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];  // Get today's day

    // Find the delivery slot for today
    const deliverySlot = await DeliverySlot.findOne({ day: currentDay });
    if (!deliverySlot) {
      return res.status(404).json({ message: 'No delivery slot found for today' });
    }

    // Filter out the time slots that are available
    const availableTimeSlots = deliverySlot.timeSlots.filter(slot => slot.available);

    res.status(200).json({
      day: currentDay,
      availableTimeSlots: availableTimeSlots  // Return the available time slots for today
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch available time slots' });
  }
};

// Get all blocked time slots for the current day
exports.getBlockedTimeSlots = async (req, res) => {
  try {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];  // Get today's day

    // Find the delivery slot for today
    const deliverySlot = await DeliverySlot.findOne({ day: currentDay });
    if (!deliverySlot) {
      return res.status(404).json({ message: 'No delivery slot found for today' });
    }

    // Filter out the time slots that are not available (blocked)
    const blockedTimeSlots = deliverySlot.timeSlots.filter(slot => !slot.available);

    res.status(200).json({
      day: currentDay,
      blockedTimeSlots: blockedTimeSlots  // Return the blocked time slots for today
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch available time slots' });
  }
};

// Save the updated schedule for delivery slots (toggle availability of multiple slots)
exports.toggleDeliverySlots = async (req, res) => {
  const daysData = req.body;  // Get the data (days and time slots) from the request body
  console.log(daysData);

  // Ensure that the input format is an array
  if (!Array.isArray(daysData)) {
    return res.status(400).json({ error: 'Invalid input format. Expected an array.' });
  }

  try {
    // Iterate over the data for each day and update the delivery slots
    for (const dayData of daysData) {
      const { day, timeSlots } = dayData;

      // Find the delivery slot for the specified day
      const deliverySlot = await DeliverySlot.findOne({ day });
      if (!deliverySlot) {
        return res.status(404).json({ message: `No delivery slot found for ${day}` });
      }

      // If no time slots are provided, mark all slots as unavailable and close the restaurant
      if (!timeSlots) {
        deliverySlot.isOpen = false;
        deliverySlot.timeSlots.forEach(slot => {
          slot.available = false;
        });
      } else {
        deliverySlot.isOpen = true;
        // Mark the specified time slots as available
        for (const time of timeSlots) {
          const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
          if (timeSlot) {
            timeSlot.available = true;
          }
        }
      }

      // Save the updated delivery slot
      await deliverySlot.save();
    }

    res.status(200).json({ message: 'Delivery slots updated successfully' });
  } catch (err) {
    console.error('Error updating delivery slots:', err);
    res.status(500).json({ error: 'Failed to update delivery slots' });
  }
};
