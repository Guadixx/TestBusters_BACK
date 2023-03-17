const User = require('../models/user.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate([
      'favourite_tests',
      'created_tests',
      'records',
      'achievements',
      'followed_users',
      'following_users',
      'achievements'
    ]);
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
      avatar: req.files.avatar
        ? req.files.avatar[0].path
        : 'not found',
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'not found',
    });
    const createdUser = await newUser.save();
    createdUser.password = null;
    return res.status(201).json(createdUser);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
};
