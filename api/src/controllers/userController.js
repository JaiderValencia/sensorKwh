const db = require('../database/models')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const controller = {
    register: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.send(errors.mapped())
        }

        const { userData } = req.body

        userData.password = bcrypt.hashSync(userData.password, 10)

        await db.User.create(req.body.userData)

        res.status(200).json({
            meta: {
                statusCode: 200,
                message: 'usuario creado'
            },
            userData
        })
    }
}

module.exports = controller