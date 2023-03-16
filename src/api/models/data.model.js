const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    question: { type: String, required: true, trim: true },
    question_img: { type: String },
    answer: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Data = mongoose.model('Data', DataSchema);
module.exports = Data;
