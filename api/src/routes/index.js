const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
    res.send("hola mundo")
})

module.exports = Router