const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shortDesc: String,
    longDesc: String,
    imgFile: String
})

const Product = mongoose.model('Product', productSchema)

class ProductError extends Error {
    constructor(error) {
        super(error);
        this.name = "ProductError"; 
    }
} 

async function updateProduct(id, updateProduct) {
    const updated = await Product.findOneAndUpdate(id, updateProduct, {new: true});
    return updated.toObject();
}

async function createProduct(product) {
    const created = await Product.create(product)
    return created.toObject();
}

module.exports = { Product, updateProduct, createProduct, ProductError }