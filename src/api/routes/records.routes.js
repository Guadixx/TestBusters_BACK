const express = require('express');
const RecordsRoutes = express.Router();

const {
  getAllRecords,
  createRecord,
  getRecordById,
} = require('../controllers/records.controllers');

RecordsRoutes.get('/', getAllRecords);
RecordsRoutes.get('/:id', getRecordById);
RecordsRoutes.post('/', createRecord);

module.exports = RecordsRoutes;
