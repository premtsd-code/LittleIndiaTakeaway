const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['owner', 'customer'] }
});
userSchema.plugin(AutoIncrement, { inc_field: 'userID' });
module.exports = mongoose.model('User', userSchema);
