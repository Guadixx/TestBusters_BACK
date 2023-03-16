const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const GenericTestRoutes = express.Router();

const {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
} = require('../controllers/generictest.controller');

GenericTestRoutes.get('/', getAllGenericTests);
GenericTestRoutes.get('/:id', getGenericTestsById);
GenericTestRoutes.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createGenericTest
);

module.exports = GenericTestRoutes;
