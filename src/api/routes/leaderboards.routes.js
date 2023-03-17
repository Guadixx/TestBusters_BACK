const express = require('express');
const LeaderboardsRoutes = express.Router();

const {
  getAllLeaderboards,
  createLeaderboard,
  getLeaderboardById,
} = require('../controllers/leaderboards.controllers');

LeaderboardsRoutes.get('/', getAllLeaderboards);
LeaderboardsRoutes.get('/:id', getLeaderboardById);
LeaderboardsRoutes.post('/', createLeaderboard);

module.exports = LeaderboardsRoutes;
