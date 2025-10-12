const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BagSchema = new mongoose.Schema({
  login_id: { type: String, required: true },
  product_id:[{ type: String, required: true }],
  is_wishlisted: { type: Boolean },
  in_bag: { type: Boolean },
});

// Optional: Auto-increment plugin example if you want an order number
// OrdersSchema.plugin(AutoIncrement, { inc_field: 'order_id' });

module.exports = mongoose.model('Bag', BagSchema);
