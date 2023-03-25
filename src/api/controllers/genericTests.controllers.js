const GenericTest = require('../models/genericTest.model');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const Data = require('../models/data.model');
const Leaderboard = require('../models/leaderboard.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');
const getAllGenericTests = async (req, res, next) => {
  try {
    const numTests = await GenericTest.countDocuments();
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

    const genericTest = await GenericTest.find({ title: title })
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
      results: genericTest,
    });
  } catch (error) {
    return next(error);
  }
};
const getGenericTestsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const checkComments = await GenericTest.findById(id);
    const comments = [];
    for (const commentId of checkComments.comments) {
      const comment = await Comment.findById(commentId);
      if (comment != null) {
        comments.push(comment);
      }
    }
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
    await GenericTest.findByIdAndUpdate(
      id,
      { comments: comments },
      { new: true }
    );
    const genericTest = await GenericTest.findById(id).populate([
      'creator',
      'data',
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
    return res
      .status(200)
      .json({ test: genericTest, average: percentageUser, record: userRecord });
  } catch (error) {
    return next(error);
  }
};
const createGenericTest = async (req, res, next) => {
  try {
    const newGenericTest = new GenericTest({
      ...req.body,
      thumbnail: req.files.thumbnail
        ? req.files.thumbnail[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png',
      banner: req.files.banner
        ? req.files.banner[0].path
        : 'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png',
    });
    const createdGenericTest = await newGenericTest.save();
    await User.findByIdAndUpdate(
      req.body.creator,
      { $push: { created_genericTests: newGenericTest._id } },
      { new: true }
    );
    return res.status(201).json(createdGenericTest);
  } catch (error) {
    return next(error);
  }
};
const deleteGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const test = await GenericTest.findById(id);
    const deletedGenericTest = await GenericTest.findByIdAndDelete(id);
    if (
      test.thumbnail &&
      test.thumbnail !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png'
    ) {
      deleteImgCloudinary(test.thumbnail);
    }
    if (
      test.banner &&
      test.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png'
    ) {
      deleteImgCloudinary(test.banner);
    }
    await User.findByIdAndUpdate(
      test.creator,
      { $pull: { created_genericTests: id } },
      { new: true }
    );
    for (const commentId of test.comments) {
      await Comment.findByIdAndDelete(commentId);
    }
    for (const dataId of test.data) {
      const deletedData = await Data.findByIdAndDelete(dataId);
      if (deletedData.question_img) {
        deleteImgCloudinary(deletedData.question_img);
      }
      if (deletedData.answer) {
        deleteImgCloudinary(deletedData.answer);
      }
      if (deletedData.option_1) {
        deleteImgCloudinary(deletedData.option_1);
      }
      if (deletedData.option_2) {
        deleteImgCloudinary(deletedData.option_2);
      }
      if (deletedData.option_3) {
        deleteImgCloudinary(deletedData.option_3);
      }
      if (deletedData.option_4) {
        deleteImgCloudinary(deletedData.option_4);
      }
      if (deletedData.option_5) {
        deleteImgCloudinary(deletedData.option_5);
      }
    }
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.first[0]);
    }
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.second[0]);
    }
    if (test.first.length != 0) {
      await Leaderboard.findByIdAndDelete(test.third[0]);
    }
    return res.status(200).json(deletedGenericTest);
  } catch (error) {
    return next(error);
  }
};
const updateGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.body.comments_enabled == false) {
      const testToDeleteComments = await GenericTest.findById(id);
      for (const comment of testToDeleteComments) {
        await Comment.findByIdAndDelete(comment);
      }
      req.body.comments = [];
    }
    if (req.files) {
      const genericTest = await GenericTest.findById(id);
      req.body.user = genericTest.user;
      if (genericTest != null) {
        if (req.files.thumbnail) {
          deleteImgCloudinary(genericTest.thumbnail);
        }
        if (req.files.banner) {
          deleteImgCloudinary(genericTest.banner);
        }
      } else {
        for (const field in req.files) {
          deleteImgCloudinary(req.files[field][0].path);
        }
      }
      const updatedGenericTest = await GenericTest.findByIdAndUpdate(
        id,
        {
          ...req.body,
          thumbnail: req.files.thumbnail
            ? req.files.thumbnail[0].path
            : genericTest.thumbnail,
          banner: req.files.banner
            ? req.files.banner[0].path
            : genericTest.banner,
        },
        { new: true }
      );
      return res.status(200).json(updatedGenericTest);
    } else {
      const updatedGenericTest = await GenericTest.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedGenericTest);
    }
  } catch (error) {
    return next(error);
  }
};
const updateFavoritesGTest = async (req, res, next) => {
  try {
    const { testId } = req.body;
    const { userId } = req.body;
    const genericTest = await GenericTest.findById(testId);
    if (genericTest.favorites.includes(userId)) {
      await GenericTest.findByIdAndUpdate(
        testId,
        { $pull: { favorites: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $pull: { favourite_genericTests: testId } },
        { new: true }
      );
    } else {
      await GenericTest.findByIdAndUpdate(
        testId,
        { $push: { favorites: userId } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        { $push: { favourite_genericTests: testId } },
        { new: true }
      );
    }
    return res.status(200).json('favs updated');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
  deleteGenericTest,
  updateGenericTest,
  updateFavoritesGTest,
};
