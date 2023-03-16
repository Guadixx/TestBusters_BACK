const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const GenericTestRoutes = express.Router();

const {
    getAllGenericTest,
    createGenericTest,
} = require('../controllers/generictest.controller');

GenericTestRoutes.get("/", getAllGenericTest);
GenericTestRoutes.post("/", upload.multiple("thumbnail"), createGenericTest);

module.exports = GenericTestRoutes;