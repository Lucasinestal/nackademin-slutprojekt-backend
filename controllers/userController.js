const userModel = require('../models/userModel')

async function registerUser(req, res) {
    try {
        const userCreated = await userModel.createUser(req.body.userData)
        const userLogin = {
            email: userCreated.email,
            password: req.body.userData.password
        }
        res.json(await userModel.loginUser(userLogin))
    } catch (error) {
        if(error instanceof userModel.UserError) {
            res.json(error.message) 
        } else {
            res.json({message: 'Something went wrong'})
        }
    }
}


module.exports = { registerUser }