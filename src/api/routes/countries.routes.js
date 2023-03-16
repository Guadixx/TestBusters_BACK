const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const CountriesRoutes = express.Router();

const {
  getAllCountries,
  createCountry,
  putImage,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries.controllers');

CountriesRoutes.get('/', getAllCountries);
CountriesRoutes.post('/', upload.single('flag'), createCountry);
CountriesRoutes.delete('/:id', deleteCountry);
CountriesRoutes.put('/:id', updateCountry);
CountriesRoutes.put('/flag/:id', upload.single('flag'), putImage);

module.exports = CountriesRoutes;
