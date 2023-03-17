const Leaderboard = require('../models/leaderboard.model');

const getAllLeaderboards = async (req, res, next) => {
  try {
    const leaderboards = await Leaderboard.find().populate('user');
    return res.status(200).json(leaderboards);
  } catch (error) {
    return next(error);
  }
};
const getLeaderboardById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const leaderboards = await Leaderboard.findById(id).populate('user');
    return res.status(200).json(leaderboards);
  } catch (error) {
    return next(error);
  }
};
const createLeaderboard = async (req, res, next) => {
  try {
    const newleaderboard = new Leaderboard(req.body);
    const createdLeaderboard = await newleaderboard.save();
    return res.status(201).json(createdLeaderboard);
  } catch (error) {
    return next(error);
  }
};
const deleteLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLeaderboard = await Leaderboard.findByIdAndDelete(id);
    return res.status(200).json(deletedLeaderboard);
  } catch (error) {
    return next(error);
  }
};
const updateLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLeaderBoard = await Leaderboard.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedLeaderBoard);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllLeaderboards,
  createLeaderboard,
  getLeaderboardById,
  deleteLeaderboard,
  updateLeaderboard,
};
