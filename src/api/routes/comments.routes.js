const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
  getCommentById,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.get('/:id', getCommentById);
CommentsRoutes.post('/', createComment);

module.exports = CommentsRoutes;
