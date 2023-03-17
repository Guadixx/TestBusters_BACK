const mongoose = require('mongoose');

const FeaturedTestSchema = mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    thumbnail: { type: String },
    banner: { type: String },
    data_type: { type: String, required: true },
    filter_1: {
      key: { type: String, default: 'none' },
      value: { type: String, default: 'none' },
    },
    filter_2: {
      key: { type: String, default: 'none' },
      value: { type: String, default: 'none' },
    },
    filters: [
      {
        key: { type: String, default: 'none' },
        value: [{ type: String, default: 'none' }],
      },
    ],
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_text: [{ type: String, trim: true, required: true }],
    time: { type: String, required: true },
    average: [{ type: Number }], //PUSHEAMOS TODOS LAS PUNTUACIONES EN TANTO POR CIENTO REDONDEADAS AL PRIMER DECIMAL. EN CASO DE QUE EL USUARIO SUPERE SU MARCA BUSCAMOS LA ANTERIOR Y LA CAMBIAMOS POR LA NUEVA.
    random: { type: Boolean, default: true },
    comments_enabled: { type: Boolean, default: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    times_played: { type: Number, default: 0 },
    favorites: [{ type: String }],
    rating: [{ type: Number, default: 0 }],
    first: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
    second: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
    third: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leaderboard' }],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const FeaturedTest = mongoose.model('FeaturedTest', FeaturedTestSchema);
module.exports = FeaturedTest;
