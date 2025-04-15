const DeliverySlot = require('../models/DeliverySlot'); // Assuming your model is in 'models' folder

// Controller to fetch all delivery slots
exports.getAllDeliverySlots = async (req, res) => {
  try {
    const deliverySlots = await DeliverySlot.find();
    console.log(deliverySlots);
    res.status(200).json(deliverySlots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch delivery slots' });
  }
};

// Controller to toggle 'isOpen' value for a specific day
exports.openCloseRestaurant = async (req, res) => {
  const { day } = req.params;  // Get the day from the URL parameter

  try {
    // Find the delivery slot by the day
    const deliverySlot = await DeliverySlot.findOne({ day });

    if (!deliverySlot) {
      return res.status(404).json({ error: 'Delivery slot not found for this day' });
    }

    // Toggle the 'isOpen' field (if it's true, make it false, and if it's false, make it true)
    deliverySlot.isOpen = !deliverySlot.isOpen;

    // Save the updated slot back to the database
    await deliverySlot.save();

    res.status(200).json({
      message: `Restaurant for ${day} has been ${deliverySlot.isOpen ? 'opened' : 'closed'}`,
      updatedSlot: deliverySlot
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle the restaurant status' });
  }
};


// exports.toggleTimeSlot = async (req, res) => {
//     const { day, time } = req.params;  // Get the day and time from the URL parameters
  
//     try {
//       // Find the delivery slot by the day
//       const deliverySlot = await DeliverySlot.findOne({ day });
  
//       if (!deliverySlot) {
//         return res.status(404).json({ error: 'Delivery slot not found for this day' });
//       }
  
//       // Find the specific time slot by the given time
//       const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
  
//       if (!timeSlot) {
//         return res.status(404).json({ error: `Time slot for ${time} not found on ${day}` });
//       }
  
//       // Toggle the availability of the time slot (true to false, false to true)
//       timeSlot.available = !timeSlot.available;
  
//       // Save the updated delivery slot back to the database
//       await deliverySlot.save();
  
//       res.status(200).json({
//         message: `The timeslot ${time} on ${day} has been ${timeSlot.available ? 'opened' : 'closed'}`,
//         updatedSlot: deliverySlot
//       });
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to toggle the time slot availability' });
//     }
//   };


  // Controller to toggle a time slot's availability
  exports.toggleTimeSlot = async (req, res) => {
    const { day, time } = req.params;
  
    try {
      // Find the delivery slot for the given day
      const deliverySlot = await DeliverySlot.findOne({ day });
      if (!deliverySlot) {
        return res.status(404).json({ error: 'Delivery slot not found for the specified day' });
      }
  
      // Find the time slot in the deliverySlot's timeSlots array
      const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
      if (!timeSlot) {
        return res.status(404).json({ error: 'Time slot not found' });
      }
  
      // Toggle the available status of the time slot
      timeSlot.available = !timeSlot.available;
  
      // Save the updated delivery slot
      await deliverySlot.save();
  
      res.status(200).json({ message: `Time slot for ${time} on ${day} toggled successfully`, timeSlot });
    } catch (err) {
      res.status(500).json({ error: 'Failed to toggle time slot' });
    }
  };
  

  exports.getAvailableTimeSlots = async (req, res) => {
    try {
      // Get the current day (e.g., "Monday")
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const currentDay = daysOfWeek[new Date().getDay()];  // Get the current day as a string
  
      // Find the delivery slot for the current day
      const deliverySlot = await DeliverySlot.findOne({ day: currentDay });
  
      if (!deliverySlot) {
        return res.status(404).json({ message: 'No delivery slot found for today' });
      }
  
      // Filter available time slots
      const availableTimeSlots = deliverySlot.timeSlots.filter(slot => slot.available);
  
      res.status(200).json({
        day: currentDay,
        availableTimeSlots: availableTimeSlots
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch available time slots' });
    }
  };


  exports.getBlockedTimeSlots = async (req, res) => {
    try {
      // Get the current day (e.g., "Monday")
      const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = daysOfWeek[new Date().getDay()];  // Get the current day as a string
  
      // Find the delivery slot for the current day
      const deliverySlot = await DeliverySlot.findOne({ day: currentDay });
  
      if (!deliverySlot) {
        return res.status(404).json({ message: 'No delivery slot found for today' });
      }
  
      // Filter available time slots
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
    const daysData = req.body; // Array of objects with day and selected time slots
    console.log(daysData);

    if (!Array.isArray(daysData)) {
        return res.status(400).json({ error: 'Invalid input format. Expected an array.' });
      }
    try {
      // Loop through each day in the array
      for (const dayData of daysData) {
        const { day, timeSlots } = dayData;
  
        // Find the delivery slot for the current day
        const deliverySlot = await DeliverySlot.findOne({ day });
  
        if (!deliverySlot) {
          return res.status(404).json({ message: `No delivery slot found for ${day}` });
        }
  
        // If no time slots are provided, assume the day is being turned off
        if (!timeSlots) {

           deliverySlot.isOpen=false;  
          // Set all time slots for this day to false (turned off)
          deliverySlot.timeSlots.forEach(slot => {
            slot.available = false;
          });
        } else {
            deliverySlot.isOpen=true;
          // If time slots are provided, toggle their availability
          for (const time of timeSlots) {
            const timeSlot = deliverySlot.timeSlots.find(slot => slot.time === time);
            if (timeSlot) {
              timeSlot.available = true; // Toggle availability
            }
          }
        }
  
        // Save the updated deliverySlot
        await deliverySlot.save();
      }
  
      res.status(200).json({ message: 'Delivery slots updated successfully' });
  
    } catch (err) {
      console.error('Error updating delivery slots:', err);
      res.status(500).json({ error: 'Failed to update delivery slots' });
    }
  };