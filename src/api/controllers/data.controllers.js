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
    const dataNumber = await Data.countDocuments();
    let index = -1;
    for (const data of req.body.answer) 
    { index++ 
      const newData = new Data({
      id: dataNumber + index,
      question: req.body.question[index],
      type: req.body.type[index],
      question_img: req.files.question_img && req.files.question_img[index] != undefined 
        ? req.files.question_img[index].path
        : '',
      answer: req.files.answer && req.files.answer[index] != undefined ? req.files.answer[index].path 
      : typeof data == "string" ? data : data[index],
      
      option_1: req.files.option_1 && req.files.option_1[index] != undefined 
        ? req.files.option_1[index].path
        : typeof req.body.option_1 ==  "string" ? req.body.option_1 : req.body.option_1[index],   

      option_2: req.files.option_2 && req.files.option_2[index] != undefined 
        ? req.files.option_2[index].path
        : typeof req.body.option_2 == "string" ? req.body.option_2 : req.body.option_2[index],

      option_3: req.files.option_3 && req.files.option_3[index] != undefined 
        ? req.files.option_3[index].path
        : typeof req.body.option_3 == "string" ?  req.files.option_3 : req.body.option_3[index] ,

      option_4: req.files.option_4 && req.files.option_4[index] != undefined 
        ? req.files.option_4[index].path
        : typeof req.body.option_4 == "string" ? req.files.option_4 : req.body.option_4[index],

      option_5: req.files.option_5 && req.files.option_5[index] != undefined 
        ? req.files.option_5[index].path
        : typeof req.body.option_5 == "string" ? req.files.option_5 : req.body.option_5[index],
    });
    await newData.save()};
    return res.status(200).json("hola");
  } catch (error) {
    return next(error);
  }
};
const deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedData = await Data.findByIdAndDelete(id);
    if (deletedData.question_img) {
      deleteImgCloudinary(deletedData.question_img);
    }
    if (deletedData.answer) {
      deleteImgCloudinary(deletedData.answer);
    }
    if (deletedData.option_1) {
      deleteImgCloudinary(deletedData.option_1);
    }
    if (deletedData.option_2) {
      deleteImgCloudinary(deletedData.option_2);
    }
    if (deletedData.option_3) {
      deleteImgCloudinary(deletedData.option_3);
    }
    if (deletedData.option_4) {
      deleteImgCloudinary(deletedData.option_4);
    }
    if (deletedData.option_5) {
      deleteImgCloudinary(deletedData.option_5);
    }
    return res.status(200).json(deletedData);
  } catch (error) {
    return next(error);
  }
};
const updateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.files) {
      const data = await Data.findById(id);
      if (data != null) {
        if (req.files.question_img) {
          deleteImgCloudinary(data.question_img);
        }
        if (req.files.answer) {
          deleteImgCloudinary(data.answer);
        }
        if (req.files.option_1) {
          deleteImgCloudinary(data.option_1);
        }
        if (req.files.option_2) {
          deleteImgCloudinary(data.option_2);
        }
        if (req.files.option_3) {
          deleteImgCloudinary(data.option_3);
        }
        if (req.files.option_4) {
          deleteImgCloudinary(data.option_4);
        }
        if (req.files.option_5) {
          deleteImgCloudinary(data.option_5);
        }
      } else {
        for (const field in req.files) {
          deleteImgCloudinary(req.files[field][0].path);
        }
      }
      const updatedData = await Data.findByIdAndUpdate(
        id,
        {
          ...req.body,
          question_img: req.files.question_img
            ? req.files.question_img[0].path
            : data.question_img,
          answer: req.files.answer ? req.files.answer[0].path : data.answer,
          option_1: req.files.option_1
            ? req.files.option_1[0].path
            : data.option_1,
          option_2: req.files.option_2
            ? req.files.option_2[0].path
            : data.option_2,
          option_3: req.files.option_3
            ? req.files.option_3[0].path
            : data.option_3,
          option_4: req.files.option_4
            ? req.files.option_4[0].path
            : data.option_4,
          option_5: req.files.option_5
            ? req.files.option_5[0].path
            : data.option_5,
        },
        { new: true }
      );
      return res.status(200).json(updatedData);
    } else {
      const updatedData = await Data.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedData);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllData,
  createData,
  getDataById,
  deleteData,
  updateData,
};
