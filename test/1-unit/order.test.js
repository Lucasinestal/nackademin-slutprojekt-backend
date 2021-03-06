const chai = require('chai')
const { expect } = chai
const { connect, disconnect } = require('../../db/index')
const orderModel = require('../../models/orderModel')

describe('unit test for order models', () => {
    before(async () => {
        await connect()
    })
    after(async () => {
        await disconnect()
    })
    beforeEach('clear data', async () => {
        await orderModel.deleteAll();
    })

    it('Should create a new order', async () => {
        // arrange
        const orderFields =  {
            status: 'inProcess',
            items: [],
            orderValue: 999
        } 

        // act
        const orderData = await orderModel.createOrder(orderFields);

        // assert
        expect(orderData).to.be.a('object');

        expect(orderData).to.have.any.keys('_id', 'timeStamp', 'status', 'items', 'ordervalue');
    })

    it('Should return all orders', async () => {

        const orderFields =  {
            status: 'inProcess',
            items: [],
            orderValue: 999
        } 

        await orderModel.createOrder(orderFields);
        await orderModel.createOrder(orderFields);
        await orderModel.createOrder(orderFields);

        const allOrders = await orderModel.getAllOrders();

        expect(allOrders).to.be.a("array");
        expect(allOrders).to.have.keys("0","1","2")
    })


}) 