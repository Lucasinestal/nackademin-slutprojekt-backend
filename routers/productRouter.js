const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')
const { isAuthenticated } = require('../middleware/authMiddle')

productRouter.get('/', productController.getAllProducts)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', isAuthenticated, productController.createProduct)
productRouter.patch('/:id', isAuthenticated, productController.updateProduct)
productRouter.delete('/:id', isAuthenticated, productController.deleteProduct)

module.exports = productRouter




