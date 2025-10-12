const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Orders.find().populate('product_ids'); // populate product details
    res.json(orders);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id).populate('product_ids');
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// POST: Create a new order
router.post('/', async (req, res) => {
  const {
    login_id,
    name,
    email,
    phone,
    product_ids,
    total_price,
    payment_method,
    payment_status,
    address,
    pincode,
    ordered_date,
  } = req.body;

  const newOrder = new Orders({
    login_id,
    name,
    email,
    phone,
    product_ids, // should be an array of ObjectIds
    total_price,
    payment_method,
    payment_status,
    address,
    pincode,
    ordered_date: ordered_date || new Date()
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// PATCH: Update an order
router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('product_ids');

    if (!updatedOrder) return res.status(404).send('Order not found');
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// DELETE: Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const foundOrder = await Orders.findById(req.params.id);
    if (!foundOrder) return res.status(404).send('Order not found');

    await foundOrder.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
