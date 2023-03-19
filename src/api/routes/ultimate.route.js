const express = require('express');
const UltimateRoute = express.Router();

const {
  ultimateController,
} = require('../controllers/ultimateController.controller');

UltimateRoute.patch('/', ultimateController);

module.exports = UltimateRoute;
