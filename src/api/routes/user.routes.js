const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const UserRoutes = express.Router();

const {
  getAllUsers,
  registerUser,
} = require('../controllers/user.controllers');

UserRoutes.get('/', getAllUsers);
UserRoutes.post(
  '/',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  registerUser
);

module.exports = UserRoutes;
