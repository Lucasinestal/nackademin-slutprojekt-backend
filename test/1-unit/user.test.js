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
        const userData = await userModel.createUser(userFields);

        // assert
        expect(userData).to.be.a('object');

        expect(userData).to.have.any.keys('email', '_id', 'password', 'name', 'role', 'adress');
    })

    it('Should throw error if user exists', async () => {
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
        await userModel.createUser(userFields);

        // assert
        userModel.createUser(userFields)
            .then(() => {
                throw new Error('user should already exist')
            })
            .catch((err) => {
                expect(err instanceof userModel.UserError).to.equal(true);
            })
    })

    it('Should login the user', async () => {
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
        await userModel.createUser(userFields)
        const loginFields = {
            email: 'test@test.se',
            password: 'test'
        }

        // act
        const result = await userModel.loginUser(loginFields)

        // assert
        expect(result).to.have.any.keys('token', 'user');
    })
}) 