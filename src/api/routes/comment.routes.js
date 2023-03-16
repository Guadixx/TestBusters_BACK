const express = require('express');
const Comments = express.Router();

const {
    getAllComments,
    createComments,
} = require('../controllers/comment.controller');

Comments.get("/", getAllComments);
Comments.post("/", createComments);

module.exports = Comments;