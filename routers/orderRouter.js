const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/orderController')
const { isAuthenticated } = require('../middleware/authMiddle')

orderRouter.get('/', isAuthenticated, orderController.getOrders)
orderRouter.post('/', isAuthenticated, orderController.createOrder)

module.exports = orderRouter