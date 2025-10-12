const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Get all Users
router.get('/',async(req,res)=>{
  try{
    const user = await User.find()
    res.json(user)
  }catch(err){
    res.send('Error' + err)
  }
})

//Get user by Id
router.get('/:id',async(req,res) => {
  try{
    const user = await User.findById(req.params.id)
    res.json(user)
  }catch(err){
    res.send('Error' + err)
  }
})


//Add a user
router.post('/',async(req,res)=>{
  const user =new User({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password,
    DOB:req.body.DOB,
    role:req.body.role,
  })
  try{
    const userSave = await user.save()
    res.json(userSave)
  }catch(err){
    res.send('Error' + err)
  }
})

//Update user
router.patch('/:id',async(req,res)=>{
  try{
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

  }catch(err){
    res.send('Error' + err)
  }
})

//Delete user
router.delete('/:id',async(req,res)=>{
  try{
    const findUser = await User.findById(req.params.id)
    // findUser.role = req.body.role
    const userSave = await findUser.deleteOne()
    res.json(userSave)
  }catch(err){
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

module.exports = router