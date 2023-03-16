const GenericTest = require('../models/generic-test.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllGenericTests = async (req, res, next) => {
  try {
    const generictest = await GenericTest.find().populate(
      'data comments leaderboard.first leaderboard.second leaderboard.third'
    );
    return res.status(200).json(generictest);
  } catch (error) {
    return next(error);
  }
};

const createGenericTest = async (req, res, next) => {
  try {
    const newGenericTest = new GenericTest({
      ...req.body,
      thumbnail: req.file ? req.file.path : 'Image not found',
      banner: req.file ? req.file.path : 'Image not found',
    });
    const createdGenericTest = await newGenericTest.save();
    return res.status(201).json(createdGenericTest);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllGenericTests,
  createGenericTest,
};
