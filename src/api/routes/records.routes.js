const express = require('express');
const RecordsRoutes = express.Router();

const {
  getAllRecords,
  createRecord,
  getRecordById,
  deleteRecord,
  updateRecord,
} = require('../controllers/records.controllers');

RecordsRoutes.get('/', getAllRecords);
RecordsRoutes.get('/:id', getRecordById);
RecordsRoutes.post('/', createRecord);
RecordsRoutes.delete('/:id', deleteRecord);
RecordsRoutes.put('/:id', updateRecord);

module.exports = RecordsRoutes;
