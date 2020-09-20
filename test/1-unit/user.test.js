const chai = require('chai')
const { expect } = chai
const { connect, disconnect } = require('../../db/index')

const userModel = require('../../models/userModel')

describe('unit test for user models', () => {
    before(async () => {
        await connect()
    })
    after(async () => {
        await disconnect()
    })
    beforeEach('clean user data', async () => {
        await userModel.User.deleteMany({})
    })
    it('Should register a user to the database', async () => {
        // arrange
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

        // act
        const userData = await userModel.registerUser(userFields)

        // assert
        console.log(userData)
    })
})