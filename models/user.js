const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
  },
  phone: { 
    type: Number, 
    required: true, 
    match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'] 
  },
  password: { type: String, required: true },
  DOB: { type: Date, required: true },
  Enabled: { type: Boolean, default: true },
  role: {type: String}
})
UserSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('user',UserSchema)