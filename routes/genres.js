const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');



const Gener = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 50
  }
}));



router.get('/', async (req, res) => {
  const genres = await Gener.find().sort('name');
  res.send(genres);
});


router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Gener({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});


router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Gener.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.delete('/:id',async (req, res) => {
  const genre = await Gener.findByIdAndRemove(req.params.id); 
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', async(req, res) => {
  const genre = await Gener.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;