const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movie');
const rentals = require('./routes/rental');
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)



mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connecting to mongo db'))
    .catch(err => console.log('not connected to mongo db'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));