const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    user: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    id: { type: Number, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    likes: { type: Number, required: true, trim: true },
    dislikes: { type: Number, required: true, trim: true },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
