const Country = require('../models/country.model');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllCountries = async (req, res, next) => {
  const status = req.query.status ? req.query.status : { "$regex": "", "$options": "i" }
  const continent = req.query.continent ? req.query.continent : { "$regex": "", "$options": "i" }
  try {
    const country = await Country.find({status: status, continent: continent});
    return res.status(200).json(country);
  } catch (error) {
    return next(error);
  }
};
const createCountry = async (req, res, next) => {
  try {
    const newCountry = new Country({
      ...req.body,
      flag: req.file ? req.file.path : 'Not image found',
    });
    const createdCountry = await newCountry.save();
    return res.status(201).json(createdCountry);
  } catch (error) {
    return next(error);
  }
};
const deleteCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (deletedCountry.flag) {
      deleteImgCloudinary(deletedCountry.flag);
    }
    return res.status(200).json('Country deleted');
  } catch (error) {
    return next(error);
  }
};
const updateCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCountry = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedCountry);
  } catch (error) {
    return next(error);
  }
};
const putImage = async (req, res, next) => {
  const flag = req.file ? req.file.path : 'Not image found';
  const { id } = req.params;
  try {
    const updatedCountry = await Country.findOneAndUpdate(
      { id: id },
      { flag: flag },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedCountry);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCountries,
  createCountry,
  putImage,
  updateCountry,
  deleteCountry,
};
