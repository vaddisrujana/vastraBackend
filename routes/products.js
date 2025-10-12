const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const User = require('../models/user')

//Get all products
router.get('/',async(req,res)=>{
 try{
  const products  = await Products.find()
  res.json(products)
 }catch(err){
  res.send('Error '+ err)
 }
})

//Get product by id
router.get('/:id',async(req,res)=>{
  try{
    const products = await Products.findById(req.params.id)
    res.json(products)
  }catch(err){
    res.send('Error '+err)
  }
})

//Add a product
router.post('/',async(req,res)=>{
  const product = new Products({
    category:req.body.category,
    type: req.body.type,
    brand: req.body.brand,
    product_name: req.body.product_name,
    price: req.body.price,
    color: req.body.color,
    stock: req.body.stock,
    image_url: req.body.image_url,
    offer: req.body.offer,
  })
  try{
    const productSave = await product.save()
    res.json(productSave)
  }catch(err){
    res.send('Error '+err)
  }
})

//Update Product
router.patch('/:id',async(req,res)=>{
  try{
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  // apply only the fields provided in req.body
      { new: true }        // return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.json(updatedProduct)

  }catch(err){
    res.send('Error' + err)
  }
})

//Delete Product
router.delete('/:id',async(req,res)=>{
  try{
    const findProduct = await Products.findById(req.params.id)
    const userProductSave = await findProduct.deleteOne()
    res.json(userProductSave)
  }catch(err){
    res.send('Error' + err)
  }
})

module.exports = router