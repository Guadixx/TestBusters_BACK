const Achievement = require('../models/achievement.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find();
    return res.status(200).json(achievements);
  } catch (error) {
    return next(error);
  }
};
const getAchievementsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const achievement = await Achievement.findById(id);
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
const deleteAchievement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAchievement = await Achievement.findByIdAndDelete(id);
    if (deletedAchievement.image) {
      deleteImgCloudinary(deletedAchievement.image);
    }
    return res.status(200).json(deletedAchievement);
  } catch (error) {
    return next(error);
  }
};
const updateAchievements = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.file) {
      const achievement = await Achievement.findById(id);
      deleteImgCloudinary(achievement.image);
      const updatedAchievement = await Achievement.findByIdAndUpdate(
        id,
        { ...req.body, image: req.file.path },
        { new: true }
      );
      return res.status(200).json(updatedAchievement);
    } else {
      const updatedAchievement = await Achievement.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      return res.status(200).json(updatedAchievement);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAchievements,
  createAchievement,
  getAchievementsById,
  deleteAchievement,
  updateAchievements,
};
