const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/orderController')

orderRouter.get('/', orderController.getOrders)
orderRouter.post('/', orderController.createOrder)

module.exports = orderRouter