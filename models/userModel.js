const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
    }
})

const User = mongoose.model('User', userSchema)

async function registerUser(newUser) {
    try {
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const result = await User.create(newUser)
        return result
    } catch (error) {
        return { message: 'Something is wrong' }
    }
} 

module.exports = { User, registerUser }