const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    timeStamp: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    items: [ 
            { 
        type : String, 
        required : true 
        } 
    ],
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
    const result = await Order.find()
    return result;
}


async function getAllOrdersByUser(user) {
    const result = await User.find(user.orderHistory)
    return result
}



module.exports = { Order, createOrder, getAllOrders }