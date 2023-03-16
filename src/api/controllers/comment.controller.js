const Comment = require('../models/comment.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllComments = async (req, res, next) => {
  try {
    const comment = await Comment.find();
    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const createdComment = await newComment.save();
    return res.status(201).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
};
