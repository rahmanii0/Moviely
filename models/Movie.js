const mongoose = require('mongoose');
const { genreSchema } = require("./Genre");
const Joi = require('joi');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

}));


function movieValidation(movie) {
    const schema = {
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().min(0).required()
    }
    return Joi.validate(movie, schema)
}


exports.Movie = Movie;
exports.movieValidation = movieValidation;