const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const UsersRoutes = express.Router();

const {
  getAllUsers,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
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
UsersRoutes.delete('/:id', deleteUser);
UsersRoutes.put(
  '/:id',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  updateUser);

module.exports = UsersRoutes;
