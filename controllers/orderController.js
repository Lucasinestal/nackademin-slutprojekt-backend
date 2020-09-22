const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

async function getOrders(req, res) {
    try {
        //if(!req.user) throw new userModel.UserError('Cannot submit order without user') 
        // const { role, _id } = req.user;

        if(/*role === 'admin'*/ true) {
            res.json(await orderModel.getAllOrders());
        } 

        // const user = await userModel.User.findById(_id).populate([
        //     {
        //         path: 'orderHistory',
        //         model: 'Order',
        //         populate: {
        //             path: 'items',
        //             model: 'Product'
        //         }
        //     }
        // ]);

        // res.json(user.orderHistory);

    } catch(err) {
        if(err instanceof userModel.UserError) {
            res.status(403).json(err.message);
        } else {
            console.error(err);
            res.sendStatus(400)
        }
    }    
}

async function getOrder(req, res) {
    try {
        const { _id } = req.params;
        res.json(await orderModel.getOrder(_id));
    } catch(err) {
        res.sendStatus(400)
    }         
}

async function createOrder(req, res) {
    try {
        const order = req.body;   
        res.status(201).json(await orderModel.createOrder(order));
    } catch(err) {
        res.sendStatus(400)
    }     
}

module.exports = { getOrders, getOrder, createOrder }
