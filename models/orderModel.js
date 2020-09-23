const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'inProgress'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orderValue: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model('Order', orderSchema)


async function createOrder(newOrder) {
    const result = await Order.create(newOrder)
    return result.toObject()
} 

async function getAllOrders() {
    const result = await Order.find().populate([
        {
            path: 'items',
            model: 'Product'
        }
    ])
    return result;
}

async function getOrder(_id) {
    const result = await Order.findById(_id).populate([
        {
            path: 'items',
            model: 'Product'
        }
    ])
    return result;
}


async function getAllOrdersByUser(user) {
    const result = await User.find(user.orderHistory)
    return result
}

class OrderError extends Error {
    constructor(error) {
        super(error);
        this.name = "ProductError"; 
    }
} 

async function deleteAll() {
    return await Order.deleteMany({});
}



module.exports = { Order, createOrder, getOrder, OrderError, getAllOrders, deleteAll }