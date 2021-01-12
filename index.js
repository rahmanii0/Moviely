const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connecting to mongo db'))
    .catch(err => console.log('not connected to mongo db'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));