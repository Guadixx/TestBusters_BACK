const express = require('express');
const LeaderboardRoutes = express.Router();

const {
    getAllLeaderboard,
    createLeaderboard,
} = require('../controllers/leaderboard.controller');

LeaderboardRoutes.get("/", getAllLeaderboard);
LeaderboardRoutes.post("/", createLeaderboard);

module.exports = LeaderboardRoutes;