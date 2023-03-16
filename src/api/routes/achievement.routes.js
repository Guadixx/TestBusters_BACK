const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const AchievementsRoutes = express.Router();

const {
  getAllAchievements,
  createAchievement,
} = require('../controllers/achievement.controller');

AchievementsRoutes.get('/', getAllAchievements);
AchievementsRoutes.post('/', upload.single('image'), createAchievement);

module.exports = AchievementsRoutes;
