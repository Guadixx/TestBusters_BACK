const DayTest = require('../models/dayTest.model');

const getAllDayTests = async (req, res, next) => {
  try {
    const dayTests = await DayTest.find().populate('test');
    return res.status(200).json(dayTests);
  } catch (error) {
    return next(error);
  }
};
const getDayTestByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const dayTests = await DayTest.findOne({ date: date }).populate('test');
    return res.status(200).json(dayTests);
  } catch (error) {
    return next(error);
  }
};
const createDayTest = async (req, res, next) => {
  try {
    const newDayTest = new DayTest(req.body);
    const createdDayTest = await newDayTest.save();
    return res.status(201).json(createdDayTest);
  } catch (error) {
    return next(error);
  }
};
const deleteDayTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDayTest = await DayTest.findByIdAndDelete(id);
    return res.status(200).json(deletedDayTest);
  } catch (error) {
    return next(error);
  }
};
const updateDayTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDayTest = await DayTest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedDayTest);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllDayTests,
  createDayTest,
  getDayTestByDate,
  deleteDayTest,
  updateDayTest,
};
