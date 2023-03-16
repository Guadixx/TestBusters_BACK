const express = require('express');
const DataRoutes = express.Router();

const { getAllData, createData } = require('../controllers/data.controllers');

DataRoutes.get('/', getAllData);
DataRoutes.post('/', createData);

module.exports = DataRoutes;
