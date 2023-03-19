const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
  handleReactions,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.get('/:id', getCommentById);
CommentsRoutes.post('/', createComment);
CommentsRoutes.put('/reactions/:id', handleReactions);
CommentsRoutes.put('/:id', updateComment);
CommentsRoutes.delete('/:id', deleteComment);

module.exports = CommentsRoutes;
