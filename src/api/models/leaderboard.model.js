const mongoose = require('mongoose');

const LeaderboardSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    backup_name: {type: String},
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
