const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.get('/:id', getCommentById);
CommentsRoutes.post('/', createComment);
CommentsRoutes.put('/:id', updateComment);
CommentsRoutes.delete('/:id', deleteComment);

module.exports = CommentsRoutes;
