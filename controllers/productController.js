const productModel  = require("../models/productModel");

async function getAllProducts(req, res){
    try {
        const products = await productModel.getProducts();
        res.status(200).json(products);
    } catch(err){
        console.log(err)
        res.sendStatus(404);
    }
}

async function getProductById(req, res){
    try {
        const id = req.params.id;
        const productItem = await productModel.getProduct(id);
        res.status(200).json(productItem);

    } catch(err){
        res.sendStatus(403)
    }
}

async function createProduct(req, res){
    try {
        if(req.user.role === "admin"){
            const newProduct = {
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
            }

            console.log('New product', newProduct);

            const createdProduct = await productModel.createProduct(newProduct);
            console.log('Created product', createdProduct);
            res.status(201).json({product: createdProduct});
        }
    } catch(err){
        console.error(err)
        res.sendStatus(401)
    }
}

async function updateProduct(req,res){
    try{
        if(req.user.role === "admin"){
            const id = req.params.id;
            const updatedFields = {
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
            }
            const updatedProduct = await productModel.updateProduct(id, updatedFields);
            res.status(202).json(updatedProduct);
        }
    }catch(err){
        console.error(err);
        res.sendStatus(401)
    }
}

async function deleteProduct(req,res){
    try{
        if(req.user.role === "admin"){
            const id = req.params.id;
            const deletedProduct = await productModel.deleteProduct(id);
            res.status(202).json(deletedProduct);
        }
    }catch(err){
        res.sendStatus(401)
    }

}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}