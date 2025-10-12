const express = require('express');
const router = express.Router();
const Bag = require('../models/bag');

// GET all Bag
router.get('/', async (req, res) => {
  try {
    const bag = await Bag.find().populate('product_id'); // populate product details
    res.json(bag);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// GET bag by ID
router.get('/:id', async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id).populate('product_id');
    if (!bag) return res.status(404).send('Order not found');
    res.json(bag);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// POST: Create a new bag
router.post('/', async (req, res) => {
  const {
    login_id,
    product_id,
    is_wishlisted,
    in_bag,
  } = req.body;

  const newBag = new Bag({
    login_id,
    product_id,
    is_wishlisted,
    in_bag,
  });

  try {
    const savedBag = await newBag.save();
    res.status(201).json(savedBag);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// PATCH: Update an bag
router.patch('/:id', async (req, res) => {
  try {
    const updatedBag = await Bag.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('product_id');

    if (!updatedBag) return res.status(404).send('Order not found');
    res.json(updatedBag);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// DELETE: Delete an Bag
router.delete('/:id', async (req, res) => {
  try {
    const foundBag = await Bag.findById(req.params.id);
    if (!foundBag) return res.status(404).send('Order not found');

    await foundBag.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
