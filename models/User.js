const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// User schema definition
const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },  // Unique identifier for the user, automatically incremented
  name: String,                            // Name of the user
  email: { type: String, unique: true },    // Email address of the user, must be unique
  password: String,                        // User's password
  role: { type: String, enum: ['owner', 'customer'] }  // Role of the user, either 'owner' or 'customer'
});

// Apply the AutoIncrement plugin to the userID field
userSchema.plugin(AutoIncrement, { inc_field: 'userID' });

// Export the User model
module.exports = mongoose.model('User', userSchema);
