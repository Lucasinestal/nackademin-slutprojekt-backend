const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');


async function getOrders(req, res) {
    try {
        if (!req.user) throw new userModel.UserError('Cannot submit order without user')
        const { role, _id } = req.user;

        if (role === 'admin') {
            res.json(await orderModel.getAllOrders());
        } else if (role === 'user') {
            const orderHistory = await userModel.getOrderHistory(_id)

            res.json(orderHistory);
        }

    } catch (err) {
        if (err instanceof userModel.UserError) {
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
    } catch (err) {
        res.sendStatus(400)
    }
}

async function createOrder(req, res) {
    try {
        const order = req.body;
        const { role, _id } = req.user;
        if (role === 'admin') throw new userModel.UserError('Cannot place order as admin')

        let orderValue = 0;

        // Find all unique products in order
        const foundProducts = await productModel.getManyProducts(order.items)
        
        // For each product ID in order.items, match it 
        // with an ID in foundProducts and get its price
        order.items.forEach(productID => {
            const index = foundProducts.findIndex(product => product._id.toString() === productID);
            const price = foundProducts[index].price
            orderValue += price;
        })

        order.orderValue = orderValue;

        const createdOrder = await orderModel.createOrder(order);
        
        // Store order ID as ref in user
        await userModel.addOrderToUser(_id, createdOrder._id);
        res.status(201).json(createdOrder)

    } catch (err) {
        if (err instanceof userModel.UserError) {
            res.status(403).json(err.message);
        } else {
            console.error(err);
            res.sendStatus(400)
        }
    }
}

module.exports = { getOrders, getOrder, createOrder }
