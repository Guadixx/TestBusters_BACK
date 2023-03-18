const GenericTest = require('../models/genericTest.model');
const Comment = require('../models/comment.model');
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
    const checkComments = await GenericTest.findById(id);
    const comments = [];
    for (const commentId of checkComments.comments) {
      const comment = await Comment.findById(commentId);
      if (comment != null) {
        comments.push(comment);
      }
    }
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
    return res.status(200).json(genericTest);
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
    return res.status(201).json(createdGenericTest);
  } catch (error) {
    return next(error);
  }
};
const deleteGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGenericTest = await GenericTest.findByIdAndDelete(id);
    if (
      deletedGenericTest.thumbnail &&
      deletedGenericTest.thumbnail !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1679001055/Pngtree_exam_icon_isolated_on_abstract_5077704_jey1op.png'
    ) {
      deleteImgCloudinary(deletedGenericTest.thumbnail);
    }
    if (
      deletedGenericTest.banner &&
      deletedGenericTest.banner !=
        'https://res.cloudinary.com/dva9zee9r/image/upload/v1678975927/testbuster/Hero-Banner-Placeholder-Light-2500x1172-1_h7azr9.png'
    ) {
      deleteImgCloudinary(deletedGenericTest.banner);
    }
    return res.status(200).json(deletedGenericTest);
  } catch (error) {
    return next(error);
  }
};
const updateGenericTest = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    genericTest.favorites.includes(userId)
      ? await GenericTest.findByIdAndUpdate(
          testId,
          { $pull: { favorites: userId } },
          { new: true }
        )
      : await GenericTest.findByIdAndUpdate(
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
  getAllGenericTests,
  createGenericTest,
  getGenericTestsById,
  deleteGenericTest,
  updateGenericTest,
  updateFavoritesGTest,
};
