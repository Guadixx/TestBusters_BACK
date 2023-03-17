const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    id: { type: Number },
    type: {type: String},
    question: { type: String, required: true, trim: true },
    question_img: { type: String },
    answer: { type: String, required: true, trim: true },
    option_1: { type: String, required: true, trim: true },
    option_2: { type: String, trim: true, default: '' },
    option_3: { type: String, trim: true, default: ''  },
    option_4: { type: String, trim: true, default: ''  },
    option_5: { type: String, trim: true, default: ''  },
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
