require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    adress: {
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema)

class UserError extends Error {
    constructor(error) {
        super(error);
        this.name = "UserError";
    }
}

async function createUser(newUser) {
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) throw new UserError('user exists');

    newUser.password = bcrypt.hashSync(newUser.password, 10)
    const result = await User.create(newUser)

    return result.toObject()
}

async function loginUser({ email, password }) {
    const userExists = await User.findOne({ email })
    if (!userExists) throw new UserError('user not found')
    const validPassword = bcrypt.compareSync(password, userExists.password)
    if (!validPassword) throw new UserError('Wrong password')
    const dataToToken = {
        _id: userExists._id,
        name: userExists.name,
        role: userExists.role,
        adress: userExists.adress
    }
    const token = jwt.sign(dataToToken, process.env.JWT_SECRET, {expiresIn: '1h'})
    return {token, user: dataToToken}
} 

module.exports = { User, UserError, createUser, loginUser }