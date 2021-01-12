const mongoose = require('mongoose');
const Joi = require('joi');




const Gener = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 50
    }
}));


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}



exports.Gener = Gener;
exports.validateGenre = validateGenre;