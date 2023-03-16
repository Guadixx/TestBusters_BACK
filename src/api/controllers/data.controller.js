const Data = require('../models/data.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllData = async (req, res, next) => {
  try {
    const data = await Data.find();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

const createData = async (req, res, next) => {
  try {
    const newData = new Data({
      ...req.body,
      question_img: req.file ? req.file.path : '',
      answer: req.file ? req.file.path : req.body.answer,
    });
    const createdData = await newData.save();
    return res.status(201).json(createdData);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllData,
  createData,
};
