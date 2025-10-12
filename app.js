const express = require('express')
const mongoose = require('mongoose')
const url ='mongodb://localhost/VastraDB'
const app = express()
 
mongoose.connect(url)
 
const con = mongoose.connection
 
con.on('open',() => {
  console.log('connected...')
})
 
app.use(express.json())
app.listen(3000,()=>{
  console.log('Server Started...')
})
 
const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

const User = require('./routes/user')
app.use('/users',User)

const Product = require('./routes/products')
app.use('/products',Product)

const Orders = require('./routes/orders')
app.use('/orders',Orders)

const Bag = require('./routes/bag')
app.use('/bag',Bag)