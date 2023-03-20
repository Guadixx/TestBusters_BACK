const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const auth = require('../../middlewares/auth.middleware');
const CountriesRoutes = express.Router();

const {
  getAllCountries,
  createCountry,
  putImage,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries.controllers');

CountriesRoutes.get('/', [auth], getAllCountries);
CountriesRoutes.post('/', [auth], upload.single('flag'), createCountry);
CountriesRoutes.delete('/:id', [auth], deleteCountry);
CountriesRoutes.put('/:id', [auth], updateCountry);
CountriesRoutes.put('/flag/:id', [auth],  upload.single('flag'), putImage);

module.exports = CountriesRoutes;
