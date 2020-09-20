const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    adress: {
        street: String,
        zip: String,
        city: String
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