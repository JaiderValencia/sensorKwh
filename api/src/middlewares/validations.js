const { body } = require('express-validator')
const db = require('../database/models')

module.exports = {
    userValidator: [
        body('userData')
            .notEmpty().withMessage('Debes llenar de información el formulario')
            .custom(async (value) => {
                if (!value.full_name) {
                    throw new Error('Debes poner tu nombre completo')
                }                

                if (!value.email) {
                    throw new Error('Debes poner tu email')
                }
                
                if (!value.password) {
                    throw new Error('Debes poner tu contraseña')
                }

                if (!value.phone) {
                    throw new Error('Debes poner tu número de celular')
                }

                if (value.phone <= 0) {
                    throw new Error('Debes poner un número de telefono válido en tu pais')
                }

                const searchByFullName = await db.User.findOne({
                    where: { full_name: value.full_name }
                })

                if (searchByFullName) {
                    throw new Error('Ya existe una persona registrada con ese nombre')
                }

                const searchByEmail = await db.User.findOne({
                    where: { email: value.email }
                })

                if (searchByEmail) {
                    throw new Error('Ya existe una persona registrada con ese email')
                }

                return true
            })
    ]
}