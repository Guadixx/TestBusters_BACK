const Data = require('../models/data.model');
//const { deleteImgCloudinary } = require('../../middlewares/files..[0]s.middleware');

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
      question: req.body.question,
      question_img: req.files.question_img ? req.files.question_img[0].path : '',
      answer: req.files.answer ? req.files.answer[0].path : req.body.answer,
      option_1: req.files.option_1 ? req.files.option_1[0].path : req.body.option_1,
      option_2: req.files.option_2 ? req.files.option_2[0].path : req.body.option_2,
      option_3: req.files.option_3 ? req.files.option_3[0].path : req.body.option_3,
      option_4: req.files.option_4 ? req.files.option_4[0].path : req.body.option_4,
      option_5: req.files.option_5 ? req.files.option_5[0].path : req.body.option_5,
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
