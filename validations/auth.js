// import {body} from 'express-validator';

const { body } = require('express-validator')

module.exports = registerValidation = [
    body('email', 'Неверный email').isEmail(),
    body('password', 'Мало символов').isLength({min: 5}),
    body('fullName', 'Мало символов').isLength({min: 3}),
    body('avatarUrl', 'Неактуальная ссылка').optional().isURL()
]