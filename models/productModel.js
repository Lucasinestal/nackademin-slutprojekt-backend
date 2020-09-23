const mongoose = require('mongoose')

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

const methods = {
    updateProduct: async function (id, updateProduct) {
        const updated = await Product.findByIdAndUpdate(id, updateProduct, {new: true});
        return updated.toObject();
    },
    
    createProduct: async function (product) {
        const created = await Product.create(product)
        return created.toObject();
    },
    
    deleteProduct: async function (id) {
        const deleted = await Product.findByIdAndDelete(id);
        return deleted.toObject();
    },
    
    getProduct: async function (id) {
        const found = await Product.findById(id);
        return found.toObject();
    },
    
    getProducts: async function () {
        const found = await Product.find();
        return found;
    },

    getManyProducts: async function (productIDs) {
        const found = await Product.find({_id: { $in: productIDs }})
        return found;
    },

    deleteAll: async function() {
        return await Product.deleteMany({});
    }
}



module.exports = { Product, ...methods, ProductError }