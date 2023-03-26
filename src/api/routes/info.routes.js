const express = require('express');
const InfoRoutes = express.Router();
const auth = require('../../middlewares/auth.middleware');

const { getInfo } = require('../controllers/info.controller');

InfoRoutes.get('/', [auth], getInfo);

module.exports = InfoRoutes;
