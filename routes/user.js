const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Get all Users
router.get('/',async(req,res)=>{
  try{
    const user = await User.find()
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})
 
//Get user by Id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    res.send('Error' + err)
  }
})
 
 
//Add a user
router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.DOB | !req.body.phone) {
    return res.status(400).json({
      status: "error",
      message: "Name, Email, dob, phone and Password are required"
    });
  }
  const {email,password} = req.body
  const emailExists = await User.findOne({email})
  if(emailExists){
    return res.status(400).json({
      status:"error",
      message:"Email already exists"
    })
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  const validPassword = passwordRegex.test(password)
  if(!validPassword){
    return res.status(400).json({
      status:'error',
      message:'Password must be at least 6 characters long and contain at least one letter and one number.'
    })
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    DOB: req.body.DOB,
    admin: req.body.admin,
  })
  try {
    const userSave = await user.save()
    res.json(userSave)
  } catch (err) {
    res.send('Error' + err)
  }
})
 
//Update user
router.patch('/:id', async (req, res) => {
  try {
    // const findUser = await User.findByIdAndUpdate(req.params.id)
    // if(req.body.role){
    //   findUser.role = req.body.role
    // }
    // if(req.body.name){
    //   findUser.name = req.body.name
    // }
    // if(req.body.email){
    //   findUser.email = req.body.email
    // }
    // if(req.body.phone){
    //   findUser.phone = req.body.phone
    // }
    // if(req.body.password){
    //   findUser.password = req.body.password
    // }
    // if(req.body.DOB){
    //   findUser.DOB = req.body.DOB
    // }
    // if(req.body.enabled){
    //   findUser.enabled = req.body.enabled
    // }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  // apply only the fields provided in req.body
      { new: true }        // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    // const userSave = await findUser.save()
    // res.json(userSave)
    res.json(updatedUser)
 
  } catch (err) {
    res.send('Error' + err)
  }
})
 
//Delete user
router.delete('/:id', async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id)
    // findUser.role = req.body.role
    const userSave = await findUser.deleteOne()
    res.json(userSave)
  } catch (err) {
    res.send('Error' + err)
  }
})
 
router.patch('/byid/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },     // search by custom id
      { $set: req.body },        // update fields
      { new: true }              // return updated doc
    );
 
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
 
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});
router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({success:false,message:"Invalid email or password"})
    }
    if (password !== user.password) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    res.json({success:true,message:"Login successful",user})
  }catch(err){
    return res.status(500).json({success:false,message:"Server Error"})
  }
})

module.exports = router