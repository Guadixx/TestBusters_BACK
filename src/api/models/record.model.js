const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, refPath: 'model_type' },
    score: { type: String, trim: true }, //FORMATO PUNTOS/PUNTOS POSIBLES/TIEMPO
    last_score: { type: String, trim: true },
    rating: { type: Number, default: 0}, //SI NO ESTÁ PUNTUADO ES -1
    model_type: {  type: String, enum: ['FeaturedTest', 'GenericTest' ], required: true}       //DESDE EL CONTROLADOR DE ACABAR TESTS   POSIBILIDAD DE NO DEJAR PUNTUAR HASTA QUE NO SE COMPLETA AL MENOS UNA VEZ
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
