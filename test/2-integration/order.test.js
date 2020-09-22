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

    beforeEach(async function() {
        await productModel.Product.deleteMany({});
        await orderModel.Order.deleteMany({});
        await userModel.User.deleteMany({});
        const adminData = {
            email: 'test@test.se',
            password: 'test',
            name: 'testing tester',
            role: 'admin',
            adress: {
                street: 'testerStreet 3',
                zip: '123 45',
                city: 'testingTown'
            }
        }

        const userData = {
            email: 'test2@test.se',
            password: 'test',
            name: 'testing tester',
            role: 'user',
            adress: {
                street: 'testerStreet 3',
                zip: '123 45',
                city: 'testingTown'
            }
        }

        const userData2 = {
            email: 'test22@test.se',
            password: 'test',
            name: 'testing tester',
            role: 'user',
            adress: {
                street: 'testerStreet 3',
                zip: '123 45',
                city: 'testingTown'
            }
        }

        const userCredentials = {
            email: 'test2@test.se',
            password: 'test',
        }

        const userCredentials2 = {
            email: 'test22@test.se',
            password: 'test',
        }

        const adminCredentials = {
            email: 'test@test.se',
            password: 'test',
        }

        await userModel.createUser(adminData)
        await userModel.createUser(userData)
        await userModel.createUser(userData2)

        this.currentTest.admin = await userModel.loginUser(adminCredentials);
        this.currentTest.user = await userModel.loginUser(userCredentials);
        this.currentTest.user2 = await userModel.loginUser(userCredentials2);
    })

    it('Should place an order', async function() {

        // arrange
        const order =  {
            status: 'inProcess',
            orderValue: 999
        } 

        const token = this.test.user.token;

        // act
        await request(app)
            .post('/api/orders')
            .set('Content-Type', 'application/json')
            .set("Authorization", `Bearer ${token}`)
            .send(order)
            .then(res => {
                // assert
                expect(res).to.have.status(201)
            })
            .catch(err => {
                console.error(err)
            })
    })

    it('Should get all orders for admin', async function() {

        const userToken = this.test.user.token;
        const adminToken = this.test.admin.token;

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
                .set("Authorization", `Bearer ${userToken}`)
                .send(order)
            )
        )

        const res = await request(app)
            .get('/api/orders')
            .set("Authorization", `Bearer ${adminToken}`)

        // assert
        expect(res).to.have.status(200)
    })

    it('Should only return orders created by specific user', async function() {

        const userToken = this.test.user.token;
        const userToken2 = this.test.user2.token;

        // arrange
        let orders = [
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
                .set("Authorization", `Bearer ${userToken}`)
                .send(order)
            )
        )

        orders = orders.map(order => {
            order.orderValue = 6969;
            return order;
        })

        await Promise.all(
            orders.map(order => request(app)
                .post('/api/orders')
                .set('Content-Type', 'application/json')
                .set("Authorization", `Bearer ${userToken2}`)
                .send(order)
            )
        )

        const res = await request(app)
            .get('/api/orders')
            .set("Authorization", `Bearer ${userToken}`)

        // assert
        expect(res.body.length).to.equal(3);
        expect(res).to.have.status(200)
    })
}) 