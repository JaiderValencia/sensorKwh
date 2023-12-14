const express = require('express')
const Router = express.Router()

const controller = require('../controllers/userController')

const validation = require('../middlewares/validations')

Router.post('/', validation.userValidator, controller.register)

module.exports = Router