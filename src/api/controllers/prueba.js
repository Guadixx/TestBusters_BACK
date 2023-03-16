const Record = require('../models/record.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const createRecord = async (req, res, next) => {
  try {
    const newRecord = new Record(req.body);
    const user = User.findById(req.body.userId);
    user.records.push(newRecord._id);
    const updatedUser = User.findByIdAndUpdate(req.body.userId, user);
    const createdRecord = await newRecord.save();
    return res
      .status(201)
      .json({ newRecord: createdRecord, updatedUser: updatedUser });
  } catch (error) {
    return next(error);
  }
};
const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = Record.findById(id);
    const user = User.findById(record.userId);
    //user.records = user.records.filter((id1) => id1 !== id);
    user.records.splice(user.records.indexOf(id),1)
    const updatedUser = User.findByIdAndUpdate(record.userId, user);
    const deletedRecord = await Record.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ deletedRecord: deletedRecord, updatedUser: updatedUser });
  } catch (error) {
    return next(error);
  }
};
