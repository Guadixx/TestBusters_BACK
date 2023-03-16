const mongoose = require('mongoose');

const AchievementSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    requirements: { type: String, required: true, trim: true },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Achivement = mongoose.model('Achivement', AchievementSchema);
module.exports = Achivement;
