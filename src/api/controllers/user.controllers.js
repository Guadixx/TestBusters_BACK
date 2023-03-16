const User = require('../models/user.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().populate([
      'favourite_test',
      'created_test',
      'records',
      'achievements',
      'followed_users',
      'following_users',
      'achievements'
    ]);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body,
      avatar: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975722/testbuster/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_h6tvtz.png',
      banner: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
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
