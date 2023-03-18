const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
const DataRoutes = express.Router();

const {
  getAllData,
  createData,
  getDataById,
  deleteData,
  updateData,
} = require('../controllers/data.controllers');

DataRoutes.get('/', getAllData);
DataRoutes.get('/:id', getDataById);
DataRoutes.post(
  '/',
  upload.fields([
    { name: 'question_img', maxCount: 2 },
    { name: 'answer', maxCount: 2 },
    { name: 'option_1', maxCount: 2 },
    { name: 'option_2', maxCount: 2 },
    { name: 'option_3', maxCount: 2 },
    { name: 'option_4', maxCount: 2 },
    { name: 'option_5', maxCount: 2 },
  ]),
  createData
);
DataRoutes.delete('/:id', deleteData),
DataRoutes.put(
  '/:id',
  upload.fields([
    { name: 'question_img', maxCount: 1 },
    { name: 'answer', maxCount: 1 },
    { name: 'option_1', maxCount: 1 },
    { name: 'option_2', maxCount: 1 },
    { name: 'option_3', maxCount: 1 },
    { name: 'option_4', maxCount: 1 },
    { name: 'option_5', maxCount: 1 },
  ]),
  updateData
);

module.exports = DataRoutes;
