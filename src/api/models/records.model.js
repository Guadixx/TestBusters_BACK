const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema(
  {
    test:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeatureTest' } |
      { type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest' }],
    score: { type: String, required: true, trim: true }, //FORMATO PUNTOS/PUNTOS POSIBLES/TIEMPO
    rating: { type: Number, required: true, trim: true }, //SI NO ESTÁ PUNTUADO ES -1
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
