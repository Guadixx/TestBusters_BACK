const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const FeaturedTestsRoutes = express.Router();

const {
  getAllFeaturedTests,
  createFeaturedTest,
  getFeaturedTestsById,
  deleteFeaturedTest
} = require('../controllers/featuredTests.controllers');

FeaturedTestsRoutes.get('/', getAllFeaturedTests);
FeaturedTestsRoutes.get('/:id', getFeaturedTestsById);
FeaturedTestsRoutes.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createFeaturedTest
);
FeaturedTestsRoutes.delete('/:id', deleteFeaturedTest);

module.exports = FeaturedTestsRoutes;
