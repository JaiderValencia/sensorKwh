require('dotenv').config()
const express = require('express')
const api = express()

const routes = require('./routes')
api.use(routes)

const port = process.env.PORT || 3000
api.listen(port, () => {
    console.log(`server running on ${port} port`)
})