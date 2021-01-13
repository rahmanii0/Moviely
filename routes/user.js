const _ = require('lodash');
const bycrpt = require('bcrypt');
const { User, vlaidateUser } = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const { route } = require('./genres');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = vlaidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registred');

    user = new User(_.pick(req.body, [
        'name',
        'email',
        'password'
    ]));
    const salt = await bycrpt.genSalt(10);
    user.password = await bycrpt.hash(user.password,salt);
    await user.save();

    res.send(_.pick(user, [
        '_id',
        'name',
        'email'
    ]));



});





module.exports = router;