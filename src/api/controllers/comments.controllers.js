const Comment = require('../models/comment.model');
const GenericTest = require('../models/genericTest.model');
const FeaturedTest = require('../models/featuredTest.model');

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
    const comment = req.body.comment;
    const testId = req.body.testId;
    const model = req.body.model;
    const numComments = await Comment.countDocuments();
    if (numComments != 0) {
      const comments = await Comment.find().sort({ id: 1 });
      req.body.comment.id = comments[comments.length - 1].id + 1;
    } else {
      req.body.comment.id = 1;
    }
    const newComment = await new Comment(comment);
    model == 'GenericTest'
      ? await GenericTest.findByIdAndUpdate(
          testId,
          { $push: { comments: newComment._id } },
          { new: true }
        )
      : await FeaturedTest.findByIdAndUpdate(
          testId,
          { $push: { comments: newComment._id } },
          { new: true }
        );
    const createdComment = await newComment.save();
    return res.status(201).json(createdComment);
  } catch (error) {
    return next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    return res.status(200).json(deletedComment);
  } catch (error) {
    return next(error);
  }
};
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    req.body.user = comment.user;
    req.body.date = comment.date;
    req.body.id = comment.id;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};
const handleReactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const { reaction } = req.body;
    const comment = await Comment.findById(id);
    const reactionList =
      reaction == 'likes'
        ? comment.likes
        : reaction == 'hearts'
        ? comment.hearts
        : reaction == 'hands'
        ? comment.hands
        : comment.tear;
    reactionList.includes(userId)
      ? reactionList.splice(reactionList.indexOf(userId), 1)
      : reactionList.push(userId);
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { [reaction]: reactionList },
      { new: true }
    );
    return res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
  handleReactions,
};

//PUT     -> IF user._id ESTÁ $pull ELSE $push LIKES/HEARTS/HANDS/TEAR
