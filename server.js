const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');


const ownerRoutes = require('./routes/ownerRoutes');
const customerRoutes = require('./routes/customerRoutes');
const deliverySlotsRoutes = require('./routes/deliverySlotsRoutes'); // Import routes


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://gptpremium2425:shAfCpg2xyPmMfF2@internetsolutions.e6idy0q.mongodb.net/?retryWrites=true&w=majority&appName=internetsolutions', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.get('/', function(req, res){
    res.send('Use Postman.');
   });
app.use('/api/owner', ownerRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/deliveryslots', deliverySlotsRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

