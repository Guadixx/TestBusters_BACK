const express = require('express');
const LeaderboardsRoutes = express.Router();

const {
  getAllLeaderboards,
  createLeaderboard,
  getLeaderboardById,
  deleteLeaderboard,
  updateLeaderboard
} = require('../controllers/leaderboards.controllers');

LeaderboardsRoutes.get('/', getAllLeaderboards);
LeaderboardsRoutes.get('/:id', getLeaderboardById);
LeaderboardsRoutes.post('/', createLeaderboard);
LeaderboardsRoutes.delete('/:id', deleteLeaderboard);
LeaderboardsRoutes.put('/:id', updateLeaderboard);


module.exports = LeaderboardsRoutes;
