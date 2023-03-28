const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const auth = require('../../middlewares/auth.middleware');
const GenericTestsRoutes = express.Router();

const {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
  deleteGenericTest,
  updateGenericTest,
  updateFavoritesGTest,
  getRandomGeneric,
} = require('../controllers/genericTests.controllers');

GenericTestsRoutes.get('/', [auth], getAllGenericTests);
GenericTestsRoutes.patch('/:id', [auth], getGenericTestsById);
GenericTestsRoutes.post(
  '/', [auth],
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createGenericTest
);
GenericTestsRoutes.delete('/:id', [auth], deleteGenericTest);
GenericTestsRoutes.put(
  '/id/:id', [auth],
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  updateGenericTest
);
GenericTestsRoutes.put('/favoritesgtest', [auth], updateFavoritesGTest);
GenericTestsRoutes.get('/random', getRandomGeneric);

module.exports = GenericTestsRoutes;
