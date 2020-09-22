const productModel  = require("../models/productModel");

async function getAllProducts(req, res){
    try {
        const products = await productModel.getProducts();
        res.send(products);
        res.sendStatus(200);
    } catch(err){
        console.log(err)
        res.sendStatus(404);
    }
}

async function getProductById(req, res){
    try {
        const id = req.params.id;
        const productItem = await productModel.getProduct(id);
        res.send(productItem)
        res.sendStatus(200)

    } catch(err){
        res.sendStatus(403)
    }
}

async function createProduct(req, res){
    try {
        if(req.user.role == "admin"){
            const newProduct = {
                title: req.body.title,
                price: req.body.price,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                imgFile: req.body.imgFile
            }
            const createdProduct = await productModel.createProduct(newProduct);
            res.send(createdProduct);
            res.sendStatus(201)
        }
    } catch(err){
        res.sendStatus(401)
    }
}

async function updateProduct(req,res){
    try{
        if(req.user.role == "admin"){
            const id = req.params.id;
            const updatedFields = req.body;
            const updatedProduct = await productModel.updateProduct(id, updatedFields);
            res.send(updatedProduct);
            res.sendStatus(202)
        }
    }catch(err){
        res.sendstatus(401)
    }
}

async function deleteProduct(req,res){
    try{
        if(req.user.role == "admin"){
            const id = req.params.id;
            const deletedProduct = await productModel.deleteProduct(id);
            res.send(deletedProduct);
        }
    }catch(err){
        res.sendStatus(401)
    }

}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}