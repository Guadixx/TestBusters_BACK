const express = require('express');
const RecordsRoutes = express.Router();
const auth = require('../../middlewares/auth.middleware');

const {
  getAllRecords,
  createRecord,
  getRecordById,
  deleteRecord,
  updateRecord,
} = require('../controllers/records.controllers');

RecordsRoutes.get('/', [auth],getAllRecords);
RecordsRoutes.get('/:id', [auth],getRecordById);
RecordsRoutes.post('/', [auth],createRecord);
RecordsRoutes.delete('/:id', [auth],deleteRecord);
RecordsRoutes.put('/:id', [auth],updateRecord);

module.exports = RecordsRoutes;
