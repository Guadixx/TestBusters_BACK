const FeaturedTest = require('../models/featuredTest.model');
const Comment = require('../models/comment.model');
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
    return res.status(200).json(featuredTest);
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
    return res.status(201).json(createdFeaturedTest);
  } catch (error) {
    return next(error);
  }
};
const deleteFeaturedTest = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    return res.status(200).json(deletedFeaturedTest);
  } catch (error) {
    return next(error);
  }
};
const updateFeatureTest = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    featuredTest.favorites.includes(userId)
      ? await FeaturedTest.findByIdAndUpdate(
          testId,
          { $pull: { favorites: userId } },
          { new: true }
        )
      : await FeaturedTest.findByIdAndUpdate(
          testId,
          { $push: { favorites: userId } },
          { new: true }
        );
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
