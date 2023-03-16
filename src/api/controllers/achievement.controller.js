const Achievement = require('../models/achievements.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllAchievements = async (req, res, next) => {
  try {
    const achievement = await Achievement.find();
    return res.status(200).json(achievement);
  } catch (error) {
    return next(error);
  }
};

const createAchievement = async (req, res, next) => {
  try {
    const newAchievement = new Achievement({
      ...req.body,
      image: req.file ? req.file.path : 'Image not found',
    });
    const createdAchievement = await newAchievement.save();
    return res.status(201).json(createdAchievement);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAchievements,
  createAchievement,
};
