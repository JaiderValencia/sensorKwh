const db = require('../database/models')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const controller = {
    register: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({
                meta: {
                    statusCode: 422,
                    message: 'Hay errores en el formulario'
                },
                errors: errors.mapped()
            })
        }

        const { userData } = req.body

        userData.password = bcrypt.hashSync(userData.password, 10)

        await db.User.create(req.body.userData)

        res.status(200).json({
            meta: {
                statusCode: 200,
                message: 'Usuario creado'
            },
            userData
        })
    }
}

module.exports = controller