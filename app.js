const express = require('express')
const app = express()
const orderRouter = require('./routers/orderRouter')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')

app.use( express.json() )
app.use(express.urlencoded({ extended: true }))
app.use( express.static('public') )

//Routers
app.use('/api', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/products', productRouter)

module.exports = app