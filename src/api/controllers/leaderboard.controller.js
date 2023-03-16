const Leaderboard = require('../models/leaderboard.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllLeaderBoards = async (req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find();
    return res.status(200).json(leaderboard);
  } catch (error) {
    return next(error);
  }
};

const createLeaderBoard = async (req, res, next) => {
  try {
    const newLeaderBoard = new Leaderboard(req.body,);
    const createdLeaderBoard = await newLeaderBoard.save();
    return res.status(201).json(createdLeaderBoard);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
    getAllLeaderBoards,
   createLeaderBoard,
};
