const FeaturedTest = require('../models/featuredTest.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

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
      thumbnail: req.files.thumbnail
        ? req.files.thumbnail[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
    });
    const createdFeaturedTest = await newFeaturedTest.save();
    return res.status(201).json(createdFeaturedTest);
  } catch (error) {
    return next(error);
  }
};
const deleteFeaturedTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const featuredTest = await FeaturedTest.findByIdAndDelete(id);
    if (
      featuredTest.thumbnail &&
      featuredTest.thumbnail !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png'
    ) {
      deleteImgCloudinary(featuredTest.thumbnail);
    }
    if (
      featuredTest.banner &&
      featuredTest.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png'
    ) {
      deleteImgCloudinary(featuredTest.banner);
    }
    return res.status(200).json(featuredTest);
  } catch (error) {
    return next(error);
  }
};

const updateFeatureTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.files) {
      const featureTest = await FeaturedTest.findById(id);
      const updatedFeatureTest = await FeaturedTest.findByIdAndUpdate(
        id,
        {
          ...req.body,
          thumbnail: req.files.thumbnail
            ? req.files.thumbnail[0].path
            : featureTest.thumbnail,
          banner: req.files.banner
            ? req.files.banner[0].path
            : featureTest.banner,
        },
        { new: true }
      );
      if (req.body.thumbnail) {
        deleteImgCloudinary(featureTest.thumbnail);
      }
      if (req.body.banner) {
        deleteImgCloudinary(featureTest.banner);
      }
      return res.status(200).json(updatedFeatureTest);
    } else {
      const updatedFeatureTest = await FeaturedTest.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedFeatureTest);
    }
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllFeaturedTests,
  createFeaturedTest,
  getFeaturedTestsById,
  deleteFeaturedTest,
  updateFeatureTest,
};
