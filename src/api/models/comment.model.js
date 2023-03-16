const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: { type: Number, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    likes: [{ type: String, trim: true }],
    hearts: [{ type: String, trim: true }],
    hands: [{ type: String, trim: true }],
    tear: [{ type: String, trim: true }],
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
