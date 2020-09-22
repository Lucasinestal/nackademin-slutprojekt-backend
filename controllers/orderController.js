const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const { ObjectId } = require('mongoose').Types;

async function getOrders(req, res) {
    try {
        if(!req.user) throw new userModel.UserError('Cannot submit order without user') 
        const { role, _id } = req.user;

        if(role === 'admin') {
            res.json(await orderModel.getAllOrders());
        } else if(role === 'user') {
            const user = await userModel.User.findOne({_id}).populate('orderHistory');
            console.log(user);
    
            res.json(user.orderHistory);
        }

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
        const { role, _id } = req.user;
        if(role === 'admin') throw new userModel.UserError('Cannot place order as admin') 

        const createdOrder = await orderModel.createOrder(order);  
        
        await userModel.User.findByIdAndUpdate(_id, { $push: { orderHistory: new ObjectId(createdOrder._id) } });
        res.status(201).json(createdOrder)

    } catch(err) {
        if(err instanceof userModel.UserError) {
            res.status(403).json(err.message);
        } else {
            console.error(err);
            res.sendStatus(400)
        }
    }     
}

module.exports = { getOrders, getOrder, createOrder }
