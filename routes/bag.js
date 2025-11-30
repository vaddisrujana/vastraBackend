const express = require('express');
const router = express.Router();
const Bag = require('../models/bag');

// GET all Bag
router.get('/', async (req, res) => {
  try {
    const bag = await Bag.find(); // populate product details
    res.json(bag);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

// GET bag by ID
router.get('/:login_id', async (req, res) => {
  try {
    const bag = await Bag.find({login_id:req.params.login_id});
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
    product_details,
  } = req.body;

  const newBag = new Bag({
    login_id,
    product_details,
  });

  try {
    const savedBag = await newBag.save();
    res.status(201).json(savedBag);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// PATCH: Update an bag
router.patch('/:login_id', async (req, res) => {
  try {
    const updatedBag = await Bag.findOneAndUpdate(
      {
        login_id:req.params.login_id,"product_details.product_id": { $ne: req.body.product_details.product_id }
      },
      {
        $push: {
          product_details: {
            product_id: req.body.product_id,
            is_wishlisted: req.body.is_wishlisted,
            in_bag: req.body.in_bag
          }
        }
      },
      { new: true }
    );

    if (!updatedBag) return res.status(404).send('Order not found');
    res.json(updatedBag);
  } catch (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

// DELETE: Delete an Bag
router.delete('/:login_id', async (req, res) => {
  try {
    const foundBag = await Bag.findOneAndDelete({login_id:req.params.login_id});
    if (!foundBag) return res.status(404).send('Order not found');
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
