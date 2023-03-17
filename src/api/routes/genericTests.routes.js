const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const GenericTestsRoutes = express.Router();

const {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
  deleteGenericTest,
} = require('../controllers/genericTests.controllers');

GenericTestsRoutes.get('/', getAllGenericTests);
GenericTestsRoutes.get('/:id', getGenericTestsById);
GenericTestsRoutes.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createGenericTest
);
GenericTestsRoutes.delete('/:id', deleteGenericTest);

module.exports = GenericTestsRoutes;
