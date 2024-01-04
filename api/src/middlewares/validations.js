const { body } = require('express-validator')
const db = require('../database/models')

module.exports = {
    registerValidator: [
        body('phone')
            .notEmpty().withMessage('Debes poner tu telefono').bail()
            .custom(value => {
                if (value < 1 || !value.trim() || !value.match(/^[0-9]+$/)) {
                    throw new Error('Pon un número de telefono válido')
                }

                return true
            }),
        body('password')
            .notEmpty().withMessage('Debes poner tu contraseña').bail(),
        body('full_name')
            .notEmpty().withMessage('Debes poner tu nombre completo').bail()
            .custom(async (value) => {
                const searchByFullName = await db.User.findOne({
                    where: { full_name: value }
                })

                if (searchByFullName) {
                    throw new Error('Ya existe una persona registrada con ese nombre')
                }

                return true
            }),
        body('email')
            .notEmpty().withMessage('Debes poner tu email').bail()
            .custom(async (value) => {
                if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    throw new Error('No es un correo con formato válido')
                }

                const searchByEmail = await db.User.findOne({
                    where: { email: value }
                })

                if (searchByEmail) {
                    throw new Error('Ya existe una persona registrada con ese email')
                }

                return true
            })
    ],
    loginValidator: [
        body('email')
            .notEmpty().withMessage('El campo del correo no puede estar vacío').bail()
            .custom(value => {
                if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    throw new Error('No es un correo con formato válido')
                }
                
                return true
            }),
        body('password')
            .notEmpty().withMessage('El campo de la contraseña no puede estar vacío')
    ],
    checkLoginValidator: [
        body('email').
            custom(value => {
                if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    throw new Error('No es un correo válido')
                }

                return true
            }).bail(),
        body('name')
            .notEmpty().withMessage('No puede estar vacío').bail(),
    ]
}