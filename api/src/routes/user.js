const express = require('express')
const Router = express.Router()

const controller = require('../controllers/userController')

const validation = require('../middlewares/validations')

Router.post('/', validation.registerValidator, controller.register)

Router.post('/login', validation.loginValidator, controller.login)

module.exports = Router