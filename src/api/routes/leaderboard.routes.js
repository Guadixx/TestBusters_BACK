const express = require('express');
const LeaderboardRoutes = express.Router();

const {
    getAllLeaderBoards,
    createLeaderBoard,
} = require('../controllers/leaderboard.controller');

LeaderboardRoutes.get("/", getAllLeaderBoards);
LeaderboardRoutes.post("/", createLeaderBoard);

module.exports = LeaderboardRoutes;