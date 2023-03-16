const express = require('express');
const RecordsRoutes = express.Router();

const {
    getAllRecords,
    createRecord,
} = require('../controllers/records.controllers');

RecordsRoutes.get("/", getAllRecords);
RecordsRoutes.post("/", createRecord);

module.exports = RecordsRoutes;