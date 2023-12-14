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
    },
    login: async (req, res) => {
        const { userData } = req.body

        const userOnDB = await db.User.findOne({
            where: { email: userData.email }
        })

        if (!userOnDB || !bcrypt.compare(userData.password, userOnDB.password)) {
            return res.status(404).json({
                meta: {
                    statusCode: 404,
                    message: 'Los datos ingresados no coinciden'
                },
                oldData: {
                    email: userData.email
                }
            })
        }

        req.session.userLogged = {
            full_name: userOnDB.full_name,
            email: userOnDB.email
        }

        res.status(200).json({
            meta: {
                statusCode: 200,
                message: 'Usuario logueado'
            },
            sessionData: {
                ...req.session.userLogged
            }
        })
    }
}

module.exports = controller