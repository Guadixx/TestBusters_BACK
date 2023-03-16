const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
} = require('../controllers/comment.controller');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.post('/', createComment);

module.exports = CommentsRoutes;
