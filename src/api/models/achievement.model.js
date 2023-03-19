const mongoose = require('mongoose');

const AchievementSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true},
    verification: { type: Number},
    image: { type: String },
    requirements: { type: String, required: true, trim: true },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Achievement = mongoose.model('Achievement', AchievementSchema);
module.exports = Achievement;
