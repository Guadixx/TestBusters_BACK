const FeaturedTest = require('../models/featuredTest.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllFeaturedTests = async (req, res, next) => {
  try {
    const numTests = await FeaturedTest.countDocuments();
    let title = req.query.title
      ? { $regex: req.query.title, $options: 'i' }
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
        req.query.order == 'created' ||
        req.query.order == 'favorites' ||
        req.query.order == 'times_played' ||
        req.query.order == 'times_played'
          ? req.query.order
          : 'times_played',
      mode = req.query.mode == '1' ? parseInt(req.query.mode) : -1;
    let numPages =
      numTests % limit >= 0 ? numTests / limit + 1 : numTests / limit;
    numPages = numPages % 2 != 0 ? Math.ceil(numPages) - 1 : numPages;
    numPages = numPages == 0 ? 1 : numPages;
    if (page > numPages || page < 1) {
      page = numPages;
    }
    const prev = page == 1 ? null : page - 1;
    const next = page == numPages ? null : page + 1;
    skip = (page - 1) * limit;

    const featuredTest = await FeaturedTest.find({ title: title })
      .sort({ [order]: mode })
      .skip(skip)
      .limit(limit)
      .populate('creator');
    return res.status(200).json({
      info: {
        page: page,
        totalpages: numPages,
        next: next,
        prev: prev,
        total: numTests,
      },
      results: featuredTest,
    });
  } catch (error) {
    return next(error);
  }
};
const getFeaturedTestsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const checkComments = await FeaturedTest.findById(id);
    const comments = [];
    for (const commentId of checkComments.comments) {
      const comment = await Comment.findById(commentId);
      if (comment != null) {
        comments.push(comment);
      }
    }
    await FeaturedTest.findByIdAndUpdate(
      id,
      { comments: comments },
      { new: true }
    );
    let averageUser = 0;
    let userRecord = null;
    const user = await User.findById(userId);
    const testMinutes = parseInt(checkComments.time.split(':')[0]);
    const testSeconds = parseInt(checkComments.time.split(':')[1]);
    const testTime = testMinutes * 60 + testSeconds;
    for (const recordId of user.records) {
      const record = await Record.findById(recordId);
      if (record != null) {
        if (record.test == id) {
          userRecord = record;
          const userRecordPoints = parseInt(record.score.split('/')[0]);
          const userRecordTime =
            parseInt(record.score.split('/')[2].split(':')[0]) * 60 +
            parseInt(record.score.split(':')[1]);
          const minutesDifRecord = Math.floor(
            parseInt(testTime - userRecordTime) / 60
          );
          const secondsDifRecord =
            parseInt(testTime - userRecordTime) - minutesDifRecord * 60;
          averageUser = parseFloat(
            `${userRecordPoints}.${minutesDifRecord}${secondsDifRecord}`
          );
        }
      }
    }
    const percentageUser =
      (checkComments.average.slice(
        0,
        checkComments.average.indexOf(averageUser)
      ).length /
        (checkComments.average.length - 1)) *
      100;
    const featuredTest = await FeaturedTest.findById(id).populate([
      'creator',
      {
        path: 'first',
        populate: { path: 'user' },
      },
      {
        path: 'second',
        populate: { path: 'user' },
      },
      {
        path: 'third',
        populate: { path: 'user' },
      },
      {
        path: 'comments',
        populate: { path: 'user' },
      },
    ]);
    return res.status(200).json({
      test: featuredTest,
      average: percentageUser,
      record: userRecord,
    });
  } catch (error) {
    return next(error);
  }
};
const createFeaturedTest = async (req, res, next) => {
  try {
    const newFeaturedTest = new FeaturedTest({
      ...req.body,
      thumbnail: req.files.thumbnail
        ? req.files.thumbnail[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
    });
    const createdFeaturedTest = await newFeaturedTest.save();
    await User.findByIdAndUpdate(
      req.body.creator,
      { $push: { created_featuredTests: newFeaturedTest._id } },
      { new: true }
    );
    return res.status(201).json(createdFeaturedTest);
  } catch (error) {
    return next(error);
  }
};
const deleteFeaturedTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const test = await FeaturedTest.findById(id);
    const deletedFeaturedTest = await FeaturedTest.findByIdAndDelete(id);
    if (
      deletedFeaturedTest.thumbnail &&
      deletedFeaturedTest.thumbnail !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png'
    ) {
      deleteImgCloudinary(deletedFeaturedTest.thumbnail);
    }
    if (
      deletedFeaturedTest.banner &&
      deletedFeaturedTest.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679067709/Hero-Banner-Placeholder-Light-2500x1172-1_mpth2v.png'
    ) {
      deleteImgCloudinary(deletedFeaturedTest.banner);
    }
    await User.findByIdAndUpdate(
      test.creator,
      { $pull: { created_featuredTests: id } },
      { new: true }
    );
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.first[0]);
    }
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.second[0]);
    }
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.third[0]);
    }
    for (const commentId of test.comments) {
      await Comment.findByIdAndDelete(commentId);
    }
    return res.status(200).json(deletedFeaturedTest);
  } catch (error) {
    return next(error);
  }
};
const updateFeatureTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.body.comments_enabled == false) {
      const testToDeleteComments = await FeaturedTest.findById(id);
      for (const comment of testToDeleteComments) {
        await Comment.findByIdAndDelete(comment);
      }
      req.body.comments = [];
    }
    if (req.files) {
      const featureTest = await FeaturedTest.findById(id);
      req.body.user = featureTest.user;
      if (featureTest != null) {
        if (req.files.thumbnail) {
          deleteImgCloudinary(featureTest.thumbnail);
        }
        if (req.files.banner) {
          deleteImgCloudinary(featureTest.banner);
        }
      } else {
        for (const field in req.files) {
          deleteImgCloudinary(req.files[field][0].path);
        }
      }
      const updatedFeaturedTest = await FeaturedTest.findByIdAndUpdate(
        id,
        {
          ...req.body,
          thumbnail: req.files.thumbnail
            ? req.files.thumbnail[0].path
            : featureTest.thumbnail,
          banner: req.files.banner
            ? req.files.banner[0].path
            : featureTest.banner,
        },
        { new: true }
      );
      return res.status(200).json(updatedFeaturedTest);
    } else {
      const updatedFeaturedTest = await FeaturedTest.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedFeaturedTest);
    }
  } catch (error) {
    return next(error);
  }
};
const updateFavoritesFTest = async (req, res, next) => {
  try {
    const { testId } = req.body;
    const { userId } = req.body;
    const featuredTest = await FeaturedTest.findById(testId);
    if (featuredTest.favorites.includes(userId)) {
      await FeaturedTest.findByIdAndUpdate(
        testId,
        { $pull: { favorites: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $pull: { favourite_featuredTests: testId } },
        { new: true }
      );
    } else {
      await FeaturedTest.findByIdAndUpdate(
        testId,
        { $push: { favorites: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $push: { favourite_featuredTests: testId } },
        { new: true }
      );
    }
    return res.status(200).json('favs updated');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFeaturedTests,
  createFeaturedTest,
  getFeaturedTestsById,
  deleteFeaturedTest,
  updateFeatureTest,
  updateFavoritesFTest,
};
