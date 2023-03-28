const mongoose = require('mongoose');

const DayTestSchema = mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, refPath: 'model_type' },
    date: { type: String, trim: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    model_type: {
      type: String,
      enum: ['FeaturedTest', 'GenericTest'],
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const DayTest = mongoose.model('DayTest', DayTestSchema);
module.exports = DayTest;
