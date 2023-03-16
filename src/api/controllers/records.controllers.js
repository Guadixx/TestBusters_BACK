const Record = require('../models/record.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find().populate('test');
    return res.status(200).json(records);
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
  createRecord,
};
