const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movie');
const rentals = require('./routes/rental');
const users = require('./routes/user');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');


if(!config.get('jwt_PrivateKey')){
    console.log('FATAL ERROR');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connecting to mongo db'))
    .catch(err => console.log('not connected to mongo db'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth',auth);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));