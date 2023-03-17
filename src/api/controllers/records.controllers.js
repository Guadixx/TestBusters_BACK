const Record = require('../models/record.model');

const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find().populate('test');
    return res.status(200).json(records);
  } catch (error) {
    return next(error);
  }
};
const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const records = await Record.findById(id).populate('test');
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
const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndDelete(id);
    return res.status(200).json(record);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecordById,
  deleteRecord,
};
