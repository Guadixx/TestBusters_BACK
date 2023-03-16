const mongoose = require('mongoose');

const LeaderboardSchema = mongoose.Schema(
  {
    user_id: { type: String },
    user: { type: String },
    score: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);
module.exports = Leaderboard;
