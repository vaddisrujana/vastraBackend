const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OrdersSchema = new mongoose.Schema({
  login_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },

  // Accept an array of ObjectIds referencing products
  product_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  //  product_id:[{ type: String, required: true }],
  total_price: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: Boolean, required: true },
  address: { type: String },
  pincode: { type: Number },
  ordered_date: { type: Date, default: Date.now },
});

// Optional: Auto-increment plugin example if you want an order number
// OrdersSchema.plugin(AutoIncrement, { inc_field: 'order_id' });

module.exports = mongoose.model('Order', OrdersSchema);
