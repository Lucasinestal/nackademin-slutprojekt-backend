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
        if(true){
            const newProduct = {
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
            }
            const createdProduct = await productModel.createProduct(newProduct);
            res.status(201).json(createdProduct);
        }
    } catch(err){
        console.error(err)
        res.sendStatus(401)
    }
}

async function updateProduct(req,res){
    try{
        if(true){
            const id = req.params.id;
            const updatedFields = req.body;
            const updatedProduct = await productModel.updateProduct(id, updatedFields);
            res.status(202).json(updatedProduct);
        }
    }catch(err){
        res.sendStatus(401)
    }
}

async function deleteProduct(req,res){
    try{
        if(true){
            const id = req.params.id;
            const deletedProduct = await productModel.deleteProduct(id);
            res.status(202).json(deletedProduct);
        }
    }catch(err){
        res.sendStatus(401)
    }

}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}