const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const AchievementsRoutes = express.Router();

const {
  getAllAchievements,
  createAchievement,
} = require('../controllers/achievements.controllers');

AchievementsRoutes.get('/', getAllAchievements);
AchievementsRoutes.post('/', upload.single('image'), createAchievement);

module.exports = AchievementsRoutes;
