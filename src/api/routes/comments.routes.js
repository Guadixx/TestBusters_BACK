const express = require('express');
const CommentsRoutes = express.Router();
const auth = require('../../middlewares/auth.middleware');

const {
  getAllComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
  handleReactions,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', [auth], getAllComments);
CommentsRoutes.get('/:id', [auth], getCommentById);
CommentsRoutes.post('/', [auth], createComment);
CommentsRoutes.put('/reactions/:id', [auth], handleReactions);
CommentsRoutes.put('/:id', [auth], updateComment);
CommentsRoutes.delete('/:id', [auth], deleteComment);

module.exports = CommentsRoutes;
