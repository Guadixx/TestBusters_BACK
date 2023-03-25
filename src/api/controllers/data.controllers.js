const Data = require('../models/data.model');
const GenericTest = require('../models/genericTest.model');
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
    console.log(req.body);
    console.log(req.files);
    let indexText = 0;
    let indexImage = 0;
    const { testId } = req.body;
    for (const type of req.body.type) {
      if (type == 'image') {
        const newData = new Data({
          id: indexImage + indexText,
          question: req.body.question[indexImage + indexText],
          type: type,
          question_img:
            'https://res.cloudinary.com/dva9zee9r/image/upload/v1679340393/achievements%20icons/testbuster_icon_brsbfz.png',
          answer: req.files.answer[indexImage].path,
          option_1: req.files.option_1 && req.files.option_1[indexImage]!=undefined
            ? req.files.option_1[indexImage].path
            : '',
          option_2: req.files.option_2 && req.files.option_2[indexImage]!=undefined
            ? req.files.option_2[indexImage].path
            : '',
          option_3: req.files.option_3 && req.files.option_3[indexImage]!=undefined
            ? req.files.option_3[indexImage].path
            : '',
          option_4: req.files.option_4 && req.files.option_4[indexImage]!=undefined
            ? req.files.option_4[indexImage].path
            : '',
          option_5: req.files.option_5 && req.files.option_5[indexImage]!=undefined
            ? req.files.option_5[indexImage].path
            : '',
        });
        indexImage++;
        await newData.save();
        await GenericTest.findByIdAndUpdate(
          testId,
          { $push: { data: newData._id } },
          { new: true }
        );
      } else {
        const newData = new Data({
          id: indexImage + indexText,
          question: req.body.question[indexImage + indexText],
          type: type,
          question_img: req.files.question_img[indexText].path,
          answer:
            typeof req.body.answer == 'string'
              ? req.body.answer
              : req.body.answer[indexText],
          option_1:
            typeof req.body.option_1 == 'string'
              ? req.body.option_1
              : typeof req.body.option_1 == 'object'
              ? req.body.option_1[indexText]
              : '',
          option_2:
            typeof req.body.option_2 == 'string'
              ? req.body.option_2
              : typeof req.body.option_2 == 'object'
              ? req.body.option_2[indexText]
              : '',
          option_3:
            typeof req.body.option_3 == 'string'
              ? req.body.option_3
              : typeof req.body.option_3 == 'object'
              ? req.body.option_3[indexText]
              : '',
          option_4:
            typeof req.body.option_4 == 'string'
              ? req.body.option_4
              : typeof req.body.option_4 == 'object'
              ? req.body.option_4[indexText]
              : '',
          option_5:
            typeof req.body.option_5 == 'string'
              ? req.body.option_5
              : typeof req.body.option_5 == 'object'
              ? req.body.option_5[indexText]
              : '',
        });
        indexText++;
        await newData.save();
        await GenericTest.findByIdAndUpdate(
          testId,
          { $push: { data: newData._id } },
          { new: true }
        );
      }
    }
    return res.status(200).json('data created');
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
