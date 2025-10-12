const express = require('express')
const router = express.Router()
const Alien = require('../models/alien.js')
router.get('/',async(req,res) => {
  try{
    const aliens = await Alien.find()
    res.json(aliens)
  }catch(err){
    res.send('Error' + err)
  }
})
 
router.post('/',async(req,res) =>{
  const alien = new Alien({
    name:req.body.name,
    tech:req.body.tech,
    sub:req.body.sub
  })
  try{
    const al = await alien.save()
    res.json(al)
  }catch(err){
    res.send('Error' + err)
  }
})
 
router.get('/:id',async(req,res) => {
  try{
    const alien = await Alien.findById(req.params.id)
    res.json(alien)
  }catch(err){
    res.send('Error' + err)
  }
})
 
router.patch('/:id',async(req,res) => {
  try{
    const alien = await Alien.findById(req.params.id)
    alien.tech = req.body.tech
    const a1 = await alien.save()
    res.json(a1)
  }catch(err){
    res.send('Error' + err)
  }
})
 
router.delete('/:id',async(req,res) => {
  try{
    const alien = await Alien.findById(req.params.id)
    // alien.tech = req.body.tech
    const a1 = await alien.deleteOne()
    res.json(a1)
  }catch(err){
    res.send('Error' + err)
  }
})
 
module.exports = router