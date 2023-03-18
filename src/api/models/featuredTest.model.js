const mongoose = require('mongoose');

const FeaturedTestSchema = mongoose.Schema(
  {
    test_type: {type: String, required: true, default: "featured"},
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
    time: { type: String, required: true },                                          //-----HASTA AQUÍ PUT NORMAL DE EDITAR O CREAR TEST +RANDOM Y COMMENTS_ENABLED----------------
    average: [{ type: Number }], //PUSHEAMOS TODOS LAS PUNTUACIONES EN TANTO POR CIENTO REDONDEADAS AL PRIMER DECIMAL. EN CASO DE QUE EL USUARIO SUPERE SU MARCA BUSCAMOS LA ANTERIOR Y LA CAMBIAMOS POR LA NUEVA.
    random: { type: Boolean, default: true },
    comments_enabled: { type: Boolean, default: true },                                  //EN EL PUT SI ES FALSE SE BORRAN LOS COMENTARIOS QUE ESTABAN        Y SE PUEDEN BORRAR POR EL USUARIO???
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],                //EN DE CREAR COMENTARIO QUE LO PUSHEE AL TEST
    times_played: { type: Number, default: 0 },                                          //TIMES PLAYED, AVERAGE Y LEADERBOARD DESDE EL CONTROLADOR AL ACABAR EL TEST QUE ACTUALICE USUARIO Y EL TEST
    favorites: [{ type: String }],                                                       //UN CONTROLADOR DE TEST PARA FAVORITES Y OTRO PARA RATING
    rating: { type: Array, default: [0,0] },
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
