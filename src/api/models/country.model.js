const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema(
  {
    id: { type: Number, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    official_name: { type: String, required: true, trim: true },
    flag: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    capital: { type: String, required: true, trim: true },
    area: { type: Number, required: true, trim: true },
    population: { type: Number, required: true, trim: true },
    cities: [{ type: String, trim: true }],
    currency: { type: String, required: true, trim: true },
    continent: { type: String, required: true, trim: true },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;
