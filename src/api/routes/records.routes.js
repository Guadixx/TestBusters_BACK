const express = require('express');
const RecordsRoutes = express.Router();

const {
    getAllRecords,
    createRecord,
} = require('../controllers/record.controller');

RecordsRoutes.get("/", getAllRecords);
RecordsRoutes.post("/", createRecord);

module.exports = RecordsRoutes;