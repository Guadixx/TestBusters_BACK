const FeatureTest = require('../models/featured-test.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getFeatureTestsById = async (req, res, next) => {
  try {
    const {id} = req.params
    const featuretest = await FeatureTest.findById(id).populate([
      'creator',
      {
        path: 'first',
        populate: { path: 'user' },
      },
      {
        path: 'second',
        populate: { path: 'user' },
      },
      {
        path: 'third',
        populate: { path: 'user' },
      },
      {
        path: 'comments',
        populate: { path: 'user' },
      }
    ]);
    return res.status(200).json(featuretest);
  } catch (error) {
    return next(error);
  }
};

const getAllFeatureTests = async (req, res, next) => {
  try {
    const featuredtest = await FeatureTest.find().populate([
      'creator',
      'comments',
      'first',
      'second',
      'third',
    ]);
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
  getFeatureTestsById
};
