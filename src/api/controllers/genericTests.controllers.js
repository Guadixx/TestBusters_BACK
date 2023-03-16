const GenericTest = require('../models/genericTest.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllGenericTests = async (req, res, next) => {
  try {
    const generictest = await GenericTest.find().populate('creator');
    return res.status(200).json(generictest);
  } catch (error) {
    return next(error);
  }
};
const getGenericTestsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genericTest = await GenericTest.findById(id).populate([
      'creator',
      'data',
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
    return res.status(200).json(genericTest);
  } catch (error) {
    return next(error);
  }
};
const createGenericTest = async (req, res, next) => {
  try {
    const newGenericTest = new GenericTest({
      ...req.body,
      thumbnail: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
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
  getGenericTestsById,
};
