const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect, request } = chai
const app = require('../../app')
const { connect, disconnect } = require('../../db/index')

const userModel = require('../../models/userModel')

describe('User integration test', function () {
    before(async function () {
        await connect()
    })
    after(async function () {
        await disconnect()
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
                expect(res.body).to.have.any.keys('token','user')
            })
            .catch(function (err) {
                console.log(err)
            })

    })
    it('Should login the user', async function () {
        await userModel.createUser(this.test.user)
        const credentials = this.test.loginUser
        await request(app)
            .post('/api/auth')
            .set('Content-Type', 'application/json')
            .send(credentials)
            .then(function(res){
                expect(res.body).to.have.any.keys('token','user')
            })            
            .catch(function (err) {
                console.log(err)
            })
    })
})