const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const UsersRoutes = express.Router();

const {
  getAllUsers,
  registerUser,
  getUserById,
} = require('../controllers/users.controllers');

UsersRoutes.get('/', getAllUsers);
UsersRoutes.get('/:id', getUserById);
UsersRoutes.post(
  '/',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  registerUser
);

module.exports = UsersRoutes;
