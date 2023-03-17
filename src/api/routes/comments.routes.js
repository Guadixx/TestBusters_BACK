const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.get('/:id', getCommentById);
CommentsRoutes.post('/', createComment);
CommentsRoutes.delete('/:id', deleteComment);

module.exports = CommentsRoutes;
