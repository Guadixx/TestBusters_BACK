const mongoose = require('mongoose');

const FeaturedTestSchema = mongoose.Schema(
  {
    creator: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true },
    banner: { type: String, required: true },
    data_type: { type: String, required: true },
    filter_1: { key: { type: String }, value: { type: String } },
    filter_2: { key: { type: String }, value: { type: String } },
    filters: [{ key: { type: String }, value: [{ type: String }] }],
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_text: [{ type: String, trim: true }],
    time: { type: String, required: true },
    average: [{ type: Number }], //PUSHEAMOS TODOS LAS PUNTUACIONES EN TANTO POR CIENTO. EN CASO DE QUE EL USUARIO SUPERE SU MARCA BUSCAMOS LA ANTERIOR Y LA CAMBIAMOS POR LA NUEVA.
    random: { type: Boolean, required: true },
    comments_enabled: { type: Boolean, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    times_played: { type: Number, required: true },
    times_favorite: { type: Number, required: true },
    rating: [{ type: Number, required: true }],
    leaderboard: {
      first: {
        user_id: { type: String },
        user: { type: String },
        score: { type: String },
      },
      second: {
        user_id: { type: String },
        user: { type: String },
        score: { type: String },
      },
      third: {
        user_id: { type: String },
        user: { type: String },
        score: { type: String },
      }, //QUIZÁS HACER OTRO MODELO Y POPULARLO PARA MÁS LIMPIEZA. IGUAL CON EL CAMPO AVERAGE.
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const FeatureTest = mongoose.model('FeatureTest', FeaturedTestSchema);
module.exports = FeatureTest;
