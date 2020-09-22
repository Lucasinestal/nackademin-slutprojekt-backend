const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
const app = require('../../app')
const { connect, disconnect } = require('../../db/index')

const orderModel = require('../../models/orderModel')
const productModel = require('../../models/productModel')
const userModel = require('../../models/userModel')

describe('User integration test', function () {
    before(function () {
        connect()
    })
    after(function () {
        disconnect()
    })
    beforeEach(async function () {
        await userModel.User.deleteMany({})

        const userFields = {
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
        this.currentTest.user = userFields

        const userLogin = {
            email: 'test@test.se',
            password: 'test'
        }

        this.currentTest.loginUser = userLogin
    })
    it('Should register user and login', async function () {
        const userData = this.test.user
        await request(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send(userData)
            .then(function(res){
                console.log(res.body)
                expect(res.body).to.have.any.keys('token','user')
            })
            .catch(function (err) {
                console.log(err)
            })

    })
})