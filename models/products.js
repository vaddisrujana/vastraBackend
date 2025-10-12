const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ProductsSchema =  new mongoose.Schema({
  category: {type: String, required: true},
  type: {type: String, required: true},
  brand: {type: String, required: true},
  product_name: {type: String, required: true},
  price: {type: Number, required: true},
  color: {type: String, required: true},
  stock: {
    xs: { type: Number, default: 0 },
    s: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
    xxl: { type: Number, default: 0 },
  },
  offer: {type: Number},
  image_url: { type: String }
})
// ProductsSchema.plugin(AutoIncrement,{inc_field:"id"})
module.exports = mongoose.model('Products',ProductsSchema)