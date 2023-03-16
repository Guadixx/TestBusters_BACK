const express = require('express');
const LeaderboardsRoutes = express.Router();

const {
    getAllLeaderboards,
    createLeaderboard,
} = require('../controllers/leaderboards.controllers');

LeaderboardsRoutes.get("/", getAllLeaderboards);
LeaderboardsRoutes.post("/", createLeaderboard);

module.exports = LeaderboardsRoutes;