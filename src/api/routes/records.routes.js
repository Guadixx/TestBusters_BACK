const express = require('express');
const RecordsRoutes = express.Router();

const {
    getAllRecords,
    createRecords,
} = require('../controllers/record.controller');

RecordsRoutes.get("/", getAllRecords);
RecordsRoutes.post("/", createRecords);

module.exports = RecordsRoutes;