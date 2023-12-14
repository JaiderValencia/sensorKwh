const express = require('express')
const Router = express.Router()

const controller = require('../controllers/userController')

Router.post('/', controller.register)

module.exports = Router