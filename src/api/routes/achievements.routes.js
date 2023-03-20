const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const auth = require('../../middlewares/auth.middleware')
const AchievementsRoutes = express.Router();

const {
  getAllAchievements,
  createAchievement,
  getAchievementsById,
  deleteAchievement,
  updateAchievements,
} = require('../controllers/achievements.controllers');

AchievementsRoutes.get('/', [auth], getAllAchievements);
AchievementsRoutes.get('/:id', [auth], getAchievementsById);
AchievementsRoutes.post('/', [auth], upload.single('image'), createAchievement);
AchievementsRoutes.put('/:id', [auth], upload.single('image'), updateAchievements);
AchievementsRoutes.delete('/:id', [auth], deleteAchievement);

module.exports = AchievementsRoutes;
