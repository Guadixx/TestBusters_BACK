const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const auth = require('../../middlewares/auth.middleware');
const FeaturedTestsRoutes = express.Router();

const {
  getAllFeaturedTests,
  createFeaturedTest,
  getFeaturedTestsById,
  deleteFeaturedTest,
  updateFeatureTest,
  updateFavoritesFTest,
} = require('../controllers/featuredTests.controllers');

FeaturedTestsRoutes.get('/', [auth], getAllFeaturedTests);
FeaturedTestsRoutes.patch('/:id', [auth], getFeaturedTestsById);
FeaturedTestsRoutes.post(
  '/', [auth],
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createFeaturedTest
);
FeaturedTestsRoutes.delete('/:id', [auth], deleteFeaturedTest);
FeaturedTestsRoutes.put(
  '/id/:id',[auth],
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  updateFeatureTest
);
FeaturedTestsRoutes.put('/favoritesftest', [auth], updateFavoritesFTest);

module.exports = FeaturedTestsRoutes;
