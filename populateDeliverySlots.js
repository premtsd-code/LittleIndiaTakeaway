const mongoose = require('mongoose');
const DeliverySlot = require('./models/DeliverySlot'); 


const createDeliverySlot = async (day, isOpen) => {
  try {
    const newSlot = new DeliverySlot({
      day,
      isOpen,
    });
    await newSlot.save();
    console.log(`${day} delivery slot created!`);
  } catch (err) {
    console.error('Error creating delivery slot:', err);
  }
};


mongoose.connect('mongodb+srv://gptpremium2425:shAfCpg2xyPmMfF2@internetsolutions.e6idy0q.mongodb.net/?retryWrites=true&w=majority&appName=internetsolutions')
  .then(async () => {
    console.log('Connected to MongoDB');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of days) {
      await createDeliverySlot(day, false); 
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

