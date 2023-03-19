const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const FeaturedTest = require('../models/featuredTest.model');
const GenericTest = require('../models/genericTest.model');
const Record = require('../models/record.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllUsers = async (req, res, next) => {
  try {
    const numUsers = await User.countDocuments();
    let username = req.query.username
      ? { $regex: req.query.username, $options: 'i' }
      : { $regex: '', $options: 'i' };
    let page =
        req.query.page && !isNaN(parseInt(req.query.page))
          ? parseInt(req.query.page)
          : 1,
      limit =
        req.query.limit && !isNaN(parseInt(req.query.limit))
          ? parseInt(req.query.limit)
          : 12,
      order =
        req.query.order == 'tests_played' ? req.query.order : 'next_level',
      mode = req.query.mode == '1' ? parseInt(req.query.mode) : -1;
    let numPages =
      numUsers % limit >= 0 ? numUsers / limit + 1 : numUsers / limit;
    numPages = numPages % 2 != 0 ? Math.ceil(numPages) - 1 : numPages;
    numPages = numPages == 0 ? 1 : numPages;
    if (page > numPages || page < 1) {
      page = numPages;
    }
    const prev = page == 1 ? null : page - 1;
    const next = page == numPages ? null : page + 1;
    skip = (page - 1) * limit;

    const users = await User.find({ username: username })
      .sort({ [order]: mode })
      .skip(skip)
      .limit(limit)
      .populate([
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
    return res.status(200).json({
      info: {
        page: page,
        totalpages: numPages,
        next: next,
        prev: prev,
        total_users: numUsers,
      },
      results: users,
    });
  } catch (error) {
    return next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkFollows = await User.findById(id);
    for (const userId of checkFollows.followed_users) {
      const userToCheck = await User.findById(userId);
      if (userToCheck == null) {
        await User.findByIdAndUpdate(
          id,
          { $pull: { followed_users: userId } },
          { new: true }
        );
      }
    }
    for (const userId of checkFollows.following_users) {
      const userToCheck = await User.findById(userId);
      if (userToCheck == null) {
        await User.findByIdAndUpdate(
          id,
          { $pull: { following_users: userId } },
          { new: true }
        );
      }
    }
    let sumRecords = 0;
    for (const record of userToCheck.records) {
      const recordToFindAverage = await Record.findById(record);
      const recordList = recordToFindAverage.score.split('/');
      sumRecords += (recordList[0] / recordList[1]) * 100;
    }
    const average = sumRecords / userToCheck.records.length;
    const user = await User.findById(id).populate([
      'favourite_featuredTests',
      'created_featuredTests',
      'favourite_genericTests',
      'created_genericTests',
      {
        path: 'records',
        populate: { path: 'test' },
      },
      'achievements',
      'followed_users',
      'following_users',
      'achievements',
    ]);
    return res.status(200).json({ average: average, user: user });
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
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png', //req.files es un objeto con clave el campo y valor array con los files
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png',
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
    const deletedUser = await User.findByIdAndDelete(id);
    const created_featuredTests = deletedUser.created_featuredTests;
    const created_genericTests = deletedUser.created_genericTests;
    const records = deletedUser.records;
    const deletedUserComments = await Comment.find({ user: deletedUser._id });
    for (const comment of deletedUserComments) {
      await Comment.findByIdAndDelete(comment._id);
    }
    for (const created of created_featuredTests) {
      await FeaturedTest.findByIdAndDelete(created);
    }
    for (const created of created_genericTests) {
      await GenericTest.findByIdAndDelete(created);
    }
    for (const created of records) {
      await Record.findByIdAndDelete(created);
    }
    if (
      deletedUser.avatar &&
      deletedUser.avatar !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/user-dummy-p4ao7p3l9bvrme1wyabiin2vr079ietul8qza7zw2w_dl4uos.png'
    ) {
      deleteImgCloudinary(deletedUser.avatar);
    }
    if (
      deletedUser.banner &&
      deletedUser.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png'
    ) {
      deleteImgCloudinary(deletedUser.banner);
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    return next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.files) {
      const user = await User.findById(id);
      if (user != null) {
        if (req.files.avatar) {
          deleteImgCloudinary(user.avatar);
        }
        if (req.files.banner) {
          deleteImgCloudinary(user.banner);
        }
      } else {
        for (const field in req.files) {
          deleteImgCloudinary(req.files[field][0].path);
        }
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          ...req.body,
          avatar: req.files.avatar ? req.files.avatar[0].path : user.avatar,
          banner: req.files.banner ? req.files.banner[0].path : user.banner,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    return next(error);
  }
};
const handleFollow = async (req, res, next) => {
  try {
    const { followedUserId } = req.body;
    const { followingUserId } = req.body;
    const followedUser = await User.findById(followedUserId);
    followedUser.followed_users.includes(followingUserId)
      ? await User.findByIdAndUpdate(
          followedUser,
          { $pull: { followed_users: followingUserId } },
          { new: true }
        )
      : await User.findByIdAndUpdate(
          followedUser,
          { $push: { followed_users: followingUserId } },
          { new: true }
        );
    return res.status(200).json('follow');
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
  handleFollow,
};
