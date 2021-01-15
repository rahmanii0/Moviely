const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bycrpt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = vlaidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');

    const validPassword = await bycrpt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');
    const token = jwt.sign({ _id: user._id }, config.get('jwt_PrivateKey'));

    res.send(token);
});

function vlaidateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    }
    return Joi.validate(req, schema)
}

module.exports = router;