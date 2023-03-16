const FeatureTest = require('../models/featured-test.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllFeatureTests = async (req, res, next) => {
  try {
    const featuredtest = await FeatureTest.find().populate(
      'comments leaderboard.first leaderboard.second leaderboard.third'
    );
    return res.status(200).json(featuredtest);
  } catch (error) {
    return next(error);
  }
};

const createFeatureTest = async (req, res, next) => {
  try {
    const newFeatureTest = new FeatureTest({
      ...req.body,
      thumbnail: req.file ? req.file.path : 'Image not found',
      banner: req.file ? req.file.path : 'Image not found',
    });
    const createdFeatureTest = await newFeatureTest.save();
    return res.status(201).json(createdFeatureTest);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllFeatureTests,
  createFeatureTest,
};
