const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const UserRoutes = express.Router();

const {
    getAllUser,
    createUser,
} = require('../controllers/user.controller');

UserRoutes.get("/", getAllUser);
UserRoutes.post("/", upload.multiple("avatar"), createUser);

module.exports = UserRoutes;