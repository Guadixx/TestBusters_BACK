const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const FeaturedTestRoutes = express.Router();

const {
  getAllFeatureTests,
  createFeatureTest,
  getFeatureTestsById
} = require('../controllers/featuredtest.controllers');

FeaturedTestRoutes.get('/', getAllFeatureTests);
FeaturedTestRoutes.get('/:id', getFeatureTestsById);
FeaturedTestRoutes.post(
  '/',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  createFeatureTest
);

module.exports = FeaturedTestRoutes;
