// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'
// import mongoose from 'mongoose';
// import {validationResult} from 'express-validator';
// import UserModel from './models/User.js'

// import { registerValidation } from './validations/auth.js'

const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const registerValidation = require('./validations/auth')
const {validationResult} = require('express-validator')


// const urlencodedParser = express.urlencoded({extended: false});



mongoose
        .connect('mongodb+srv://blablabar:qwerty1234@cluster0.b5z7hia.mongodb.net/blog?retryWrites=true&w=majority')
        .then(() => console.log('DB OK'))
        .catch((err) => console.log('DB error', err))


const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(res.status(400).json(errors.array()));
    }

    // if (!req.body) return res.status(400).json('ERRORRR')

    // console.log(req.body)

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash
    })

    const user = await doc.save()
        .then(result => console.log('Product Created!'))
        .catch(err =>{
            console.log(err)
        })
    res.json(user)
})

app.listen(5000, (err) => {
    try {
        console.log('Server has been started')
    } catch {
        console.log(err.message)
    }
})