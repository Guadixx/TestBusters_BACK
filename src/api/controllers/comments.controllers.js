const Comment = require('../models/comment.model');
//const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllComments = async (req, res, next) => {
  try {
    const comment = await Comment.find().populate('user');
    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
};
const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id).populate('user');
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
  getCommentById,
};
