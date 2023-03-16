const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: { type: Number, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    likes: [{ type: String, required: true, trim: true }],
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
