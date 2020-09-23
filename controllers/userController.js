const userModel = require('../models/userModel')

async function registerUser(req, res) {
    try {
        const newUser = req.body 

        await userModel.createUser({...newUser})

        const userLogin = {
            email: newUser.email,
            password: newUser.password
        }

        res.status(200).json(await userModel.loginUser(userLogin))
    } catch (error) {
        if (error instanceof userModel.UserError) {
            res.status(409).json(error.message)
        } else {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}

async function authUser(req, res) {
    try {
        const credentials = req.body
        res.status(200).json(await userModel.loginUser(credentials))
    } catch (error) {
        if (error instanceof userModel.UserError) {
            res.status(401).json(error.message)
        } else {
            res.status(500).json({ message: 'Something went wrong' })
        }
    }
}

module.exports = { registerUser, authUser }