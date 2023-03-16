const mongoose = require('mongoose');

const GenericTestSchema = mongoose.Schema(
  {
    creator: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    type: { type: String, required: true },
    thematic: { type: String, required: true, trim: true },
    data: [
      {
        id: { type: Number, required: true },
        question: { type: String, required: true, trim: true },
        question_img: { type: String },
        answer: { type: String, required: true, trim: true },
        options: [{ type: String, required: true, trim: true }],
      },
    ],
    time: { type: String, required: true },
    average: [{ type: Number }],
    random: { type: Boolean, required: true },
    comments_enabled: { type: Boolean, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    times_played: { type: Number, required: true },
    times_favorite: { type: Number, required: true },
    rating: [{ type: Number, required: true }],
    leaderboard: {
      first: { type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' },
      second: { type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' },
      third: { type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' },
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const GenericTest = mongoose.model('GenericTest', GenericTestSchema);
module.exports = GenericTest;
