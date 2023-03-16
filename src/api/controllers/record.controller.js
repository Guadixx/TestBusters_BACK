const Record = require('../models/records.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllRecords = async (req, res, next) => {
  try {
    const record = await Record.find();
    return res.status(200).json(record);
  } catch (error) {
    return next(error);
  }
};

const createRecord = async (req, res, next) => {
  try {
    const newRecord = new Record(req.body);
    const createdRecord = await newRecord.save();
    return res.status(201).json(createdRecord);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllRecords,
  createRecord
};
