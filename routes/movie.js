const { Movie, movieValidation } = require('../models/Movie');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async(req, res) => {
    const { error } = movieValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:req._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
         
    });
    movie = await movie.save();
});

module.exports = router;