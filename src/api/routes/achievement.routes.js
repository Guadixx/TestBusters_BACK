const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const AchievementsRoutes = express.Router();

const {
    getAllAchievements,
    createAchievements,
} = require('../controllers/achievement.controller');

AchievementsRoutes.get("/", getAllAchievements);
AchievementsRoutes.post("/", upload.single("image"), createAchievements);

module.exports = AchievementsRoutes;