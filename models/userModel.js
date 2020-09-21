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

class UserError extends Error {
    constructor(error) {
        super(error);
        this.name = "UserError"; 
    }
} 

async function registerUser(newUser) {
    const userExists = await User.findOne({email: newUser.email});
    if(userExists) throw new UserError('user exists');

    newUser.password = bcrypt.hashSync(newUser.password, 10)
    const result = await User.create(newUser)
    return result.toObject()
} 

module.exports = { User, registerUser, UserError }