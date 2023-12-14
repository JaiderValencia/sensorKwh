const express = require('express')
const Router = express.Router()

const userRoutes = require('./User')

Router.use('/user', userRoutes)

module.exports = Router