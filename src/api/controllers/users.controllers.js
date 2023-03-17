const User = require('../models/user.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate([
      'favourite_featuredTests',
      'created_featuredTests',
      'favourite_genericTests',
      'created_genericTests',
      'records',
      'achievements',
      'followed_users',
      'following_users',
      'achievements',
    ]);
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id).populate([
      'favourite_featuredTests',
      'created_featuredTests',
      'favourite_genericTests',
      'created_genericTests',
      'records',
      'achievements',
      'followed_users',
      'following_users',
      'achievements',
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
      avatar: req.files.avatar ? req.files.avatar[0].path : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png',   //req.files es un objeto con clave el campo y valor array con los files
      banner: req.files.banner ? req.files.banner[0].path : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png',
    });
    const createdUser = await newUser.save();
    createdUser.password = null;
    return res.status(201).json(createdUser);
  } catch (error) {
    return next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user.avatar && user.avatar != 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png') {
      deleteImgCloudinary(user.avatar);
    }
    if (user.banner && user.banner != 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png') {
      deleteImgCloudinary(user.banner);
    }
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  deleteUser,
};
