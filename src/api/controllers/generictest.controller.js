const GenericTest = require('../models/generic-test.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getGenericTestsById = async (req, res, next) => {
  try {
    const {id} = req.params
    const generictest = await GenericTest.findById(id).populate([
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
      }
    ]);
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
const getAllGenericTests = async (req, res, next) => {
  try {
    const generictest = await GenericTest.find().populate([
      'creator',
      'data',
      'first',
      'second',
      'third',
      'comments',
    ]);
    return res.status(200).json(generictest);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
};
