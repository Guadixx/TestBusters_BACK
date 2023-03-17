const Data = require('../models/data.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllData = async (req, res, next) => {
  try {
    const data = await Data.find();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
const getDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Data.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
const createData = async (req, res, next) => {
  try {
    const newData = new Data({
      question: req.body.question,
      type: req.body.type,
      question_img: req.files.question_img
        ? req.files.question_img[0].path
        : '',
      answer: req.files.answer ? req.files.answer[0].path : req.body.answer,
      option_1: req.files.option_1
        ? req.files.option_1[0].path
        : req.body.option_1,
      option_2: req.files.option_2
        ? req.files.option_2[0].path
        : req.body.option_2,
      option_3: req.files.option_3
        ? req.files.option_3[0].path
        : req.body.option_3,
      option_4: req.files.option_4
        ? req.files.option_4[0].path
        : req.body.option_4,
      option_5: req.files.option_5
        ? req.files.option_5[0].path
        : req.body.option_5,
    });
    const createdData = await newData.save();
    return res.status(201).json(createdData);
  } catch (error) {
    return next(error);
  }
};
const deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Data.findByIdAndDelete(id);
    if (data.question_img) {
      deleteImgCloudinary(data.question_img);
    }
    if (data.answer) {
      deleteImgCloudinary(data.answer);
    }
    if (data.option_1) {
      deleteImgCloudinary(data.option_1);
    }
    if (data.option_2) {
      deleteImgCloudinary(data.option_2);
    }
    if (data.option_3) {
      deleteImgCloudinary(data.option_3);
    }
    if (data.option_4) {
      deleteImgCloudinary(data.option_4);
    }
    if (data.option_5) {
      deleteImgCloudinary(data.option_5);
    }
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllData,
  createData,
  getDataById,
  deleteData,
};
