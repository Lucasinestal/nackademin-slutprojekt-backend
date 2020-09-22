const productModel  = require("../models/productModel");

async function getAllProducts(req, res){
    const products = await productModel.getProducts();
    res.send(products);
}

async function getProductById(req, res){
    const id = req.params.id;
    const productItem = await productModel.getProduct(id);
    res.send(productItem)
}

async function createProduct(req, res){
    const newProduct = {
        title: req.body.title,
        price: req.body.price,
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        imgFile: req.body.imgFile
    }
    const createdProduct = await productModel.createProduct(newProduct);
    res.send(createdProduct);
}

async function updateProduct(req,res){
    const id = req.params.id;
    const updatedFields = req.body;
    const updatedProduct = await productModel.updateProduct(id, updatedFields);
    res.send(updatedProduct);
}

async function deleteProduct(req,res){
    const id = req.params.id;
    const deletedProduct = await productModel.deleteProduct(id);
    res.send(deletedProduct);
}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}