const Country = require('../models/country.model');

const getInfo = async (req, res, next) => {
  try {
    const countries = await Country.find();
    const countriesInfo = {
      filter_1: 'status',
      filter_2: 'continent',
      filters: 'name',
      data: countries,
      filter_data_1: 'area',
      filter_data_2: 'population',
    };
    return res.status(200).json({ countries: countriesInfo });
  } catch (error) {
    return next(error);
  }
};
module.exports = { getInfo };
