const express = require('express');
const LeaderboardsRoutes = express.Router();
const auth = require('../../middlewares/auth.middleware');

const {
  getAllLeaderboards,
  createLeaderboard,
  getLeaderboardById,
  deleteLeaderboard,
  updateLeaderboard
} = require('../controllers/leaderboards.controllers');

LeaderboardsRoutes.get('/', [auth], getAllLeaderboards);
LeaderboardsRoutes.get('/:id', [auth], getLeaderboardById);
LeaderboardsRoutes.post('/', [auth], createLeaderboard);
LeaderboardsRoutes.delete('/:id', [auth], deleteLeaderboard);
LeaderboardsRoutes.put('/:id', [auth], updateLeaderboard);


module.exports = LeaderboardsRoutes;
