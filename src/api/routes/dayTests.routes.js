const express = require('express');
const DayTestsRoutes = express.Router();
const auth = require('../../middlewares/auth.middleware');

const {
  getAllDayTests,
  createDayTest,
  getDayTestByDate,
  deleteDayTest,
  updateDayTest,
} = require('../controllers/dayTests.controllers');

DayTestsRoutes.get('/', [auth], getAllDayTests);
DayTestsRoutes.get('/:date', [auth], getDayTestByDate);
DayTestsRoutes.post('/', [auth], createDayTest);
DayTestsRoutes.delete('/:id', [auth], deleteDayTest);
DayTestsRoutes.put('/:id', [auth], updateDayTest);

module.exports = DayTestsRoutes;
