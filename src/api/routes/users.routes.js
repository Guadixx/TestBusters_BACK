const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const auth = require('../../middlewares/auth.middleware');
const UsersRoutes = express.Router();

const {
  getAllUsers,
  registerUser,
  getUserById,
  deleteUser,
  updateUser,
  handleFollow,
  loginUser,
  forgotPassword,
  changePassword,
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
UsersRoutes.patch('/delete/:id', [auth], deleteUser);
UsersRoutes.put(
  '/:id',
  [auth],
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ]),
  updateUser
);
UsersRoutes.patch('/', handleFollow);
UsersRoutes.post('/login', loginUser);

UsersRoutes.patch('/forgotpassword', forgotPassword);
UsersRoutes.patch('/changepassword/:id', changePassword);

module.exports = UsersRoutes;
