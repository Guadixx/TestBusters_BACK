const express = require('express');
const CommentsRoutes = express.Router();

const {
  getAllComments,
  createComment,
} = require('../controllers/comments.controllers');

CommentsRoutes.get('/', getAllComments);
CommentsRoutes.post('/', createComment);

module.exports = CommentsRoutes;
