const Comment = require('../models/comment.model');

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
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    return res.status(200).json(comment);
  } catch (error) {
    return next(error);
  }
};
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
};
