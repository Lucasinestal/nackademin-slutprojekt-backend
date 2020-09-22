const chai = require('chai')
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect, request } = chai
const app = require('../../app')
const { connect, disconnect } = require('../../db/index')
const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')
const userModel = require('../../models/userModel')

describe('integration tests for orders', () => {
    before(async () => {
        await connect()
    })

    after(async () => {
        await disconnect()
    })

    beforeEach(async () => {
        await productModel.Product.deleteMany({});
        await orderModel.Order.deleteMany({});
    })

    it('Should place an order', async function() {

        // arrange
        const order =  {
            status: 'inProcess',
            orderValue: 999
        } 

        // act
        await request(app)
            .post('/api/orders')
            .set('Content-Type', 'application/json')
            .send(order)
            .then(res => {
                // assert
                expect(res).to.have.status(201)
            })
            .catch(err => {
                console.error(err)
            })
    })

    it('Should get orders', async function() {

        // arrange
        const orders = [
            {
                status: 'inProcess',
                orderValue: 999
            },
            {
                status: 'inProcess',
                orderValue: 999
            },
            {
                status: 'inProcess',
                orderValue: 999
            },
        ]   

        productModel.createProduct({
            title: "wowza",
            price: 1337
        })

        // act
        await Promise.all(
            orders.map(order => request(app)
                .post('/api/orders')
                .set('Content-Type', 'application/json')
                .send(order)
            )
        )

        const res = await request(app)
            .get('/api/orders')

        // assert
        expect(res).to.have.status(200)
    })
}) 