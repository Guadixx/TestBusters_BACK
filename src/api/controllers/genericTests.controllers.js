const GenericTest = require('../models/genericTest.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

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
      thumbnail: req.files.thumbnail
        ? req.files.thumbnail[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
    });
    const createdGenericTest = await newGenericTest.save();
    return res.status(201).json(createdGenericTest);
  } catch (error) {
    return next(error);
  }
};
const deleteGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genericTest = await GenericTest.findByIdAndDelete(id);
    if (
      genericTest.thumbnail &&
      genericTest.thumbnail !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png'
    ) {
      deleteImgCloudinary(genericTest.thumbnail);
    }
    if (
      genericTest.banner &&
      genericTest.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png'
    ) {
      deleteImgCloudinary(genericTest.banner);
    }
    return res.status(200).json(genericTest);
  } catch (error) {
    return next(error);
  }
};
const updateGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.files) {
      const genericTest = await GenericTest.findById(id);
      const updatedGenericTest = await GenericTest.findByIdAndUpdate(
        id,
        {
          ...req.body,
          thumbnail: req.files.thumbnail
            ? req.files.thumbnail[0].path
            : genericTest.thumbnail,
          banner: req.files.banner
            ? req.files.banner[0].path
            : genericTest.banner,
        },
        { new: true }
      );
      if (req.files.thumbnail) {
        deleteImgCloudinary(genericTest.thumbnail);
      }
      if (req.files.banner) {
        deleteImgCloudinary(genericTest.banner);
      }
      return res.status(200).json(updatedGenericTest);
    } else {
      const updatedGenericTest = await GenericTest.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedGenericTest);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
  deleteGenericTest,
  updateGenericTest,
};
