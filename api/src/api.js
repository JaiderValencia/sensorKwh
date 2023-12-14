require('dotenv').config()
const express = require('express')
const api = express()

api.use(express.urlencoded({ extended: false }));
api.use(express.json());

const routes = require('./routes')
api.use(routes)

const port = process.env.PORT || 3000
api.listen(port, () => {
    console.log(`server running on ${port} port`)
})