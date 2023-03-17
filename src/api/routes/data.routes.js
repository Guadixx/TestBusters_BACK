const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const DataRoutes = express.Router();

const {
  getAllData,
  createData,
  getDataById,
  deleteData,
} = require('../controllers/data.controllers');

DataRoutes.get('/', getAllData);
DataRoutes.get('/:id', getDataById);
DataRoutes.post(
  '/',
  upload.fields([
    { name: 'question_img', maxCount: 1 },
    { name: 'answer', maxCount: 1 },
    { name: 'option_1', maxCount: 1 },
    { name: 'option_2', maxCount: 1 },
    { name: 'option_3', maxCount: 1 },
    { name: 'option_4', maxCount: 1 },
    { name: 'option_5', maxCount: 1 },
  ]),
  createData
);
DataRoutes.delete('/:id', deleteData),

module.exports = DataRoutes;
