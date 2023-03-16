const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const FeaturedTestRoutes = express.Router();

const {
    getAllFeaturedTest,
    createFeaturedTest,
} = require('../controllers/achievement.controller');

FeaturedTestRoutes.get("/", getAllFeaturedTest);
FeaturedTestRoutes.post("/", upload.multiple("thumbnail"), createFeaturedTest);

module.exports = FeaturedTestRoutes;