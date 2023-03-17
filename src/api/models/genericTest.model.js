const mongoose = require('mongoose');

const GenericTestSchema = mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    thumbnail: { type: String },
    banner: { type: String },
    topic: { type: String, required: true, trim: true },
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Data' }],
    time: { type: String, required: true },
    average: [{ type: Number }],
    random: { type: Boolean, default: true },
    comments_enabled: { type: Boolean, default: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    times_played: { type: Number, default: 0 },
    favorites: [{ type: String }],
    rating: [{ type: Number, default: 0 }],
    first: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
    second: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
    third: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
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
