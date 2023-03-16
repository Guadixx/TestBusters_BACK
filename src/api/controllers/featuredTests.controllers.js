const FeaturedTest = require('../models/featuredTest.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllFeaturedTests = async (req, res, next) => {
  try {
    const featuredTest = await FeaturedTest.find().populate('creator');
    return res.status(200).json(featuredTest);
  } catch (error) {
    return next(error);
  }
};
const getFeaturedTestsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const featuredTest = await FeaturedTest.findById(id).populate([
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
      },
    ]);
    return res.status(200).json(featuredTest);
  } catch (error) {
    return next(error);
  }
};
const createFeaturedTest = async (req, res, next) => {
  try {
    const newFeaturedTest = new FeaturedTest({
      ...req.body,
      thumbnail: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
    });
    const createdFeaturedTest = await newFeaturedTest.save();
    return res.status(201).json(createdFeaturedTest);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllFeaturedTests,
  createFeaturedTest,
  getFeaturedTestsById,
};
