const express = require('express');
const UltimateRoute = express.Router();
const auth = require('../../middlewares/auth.middleware');

const {
  ultimateController,
} = require('../controllers/ultimateController.controller');

UltimateRoute.patch('/', [auth], ultimateController);

module.exports = UltimateRoute;
