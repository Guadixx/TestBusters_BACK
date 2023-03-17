const express = require('express');
const RecordsRoutes = express.Router();

const {
  getAllRecords,
  createRecord,
  getRecordById,
  deleteRecord,
} = require('../controllers/records.controllers');

RecordsRoutes.get('/', getAllRecords);
RecordsRoutes.get('/:id', getRecordById);
RecordsRoutes.post('/', createRecord);
RecordsRoutes.delete('/:id', deleteRecord);

module.exports = RecordsRoutes;
