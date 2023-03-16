const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword, 'Password not valid'],
    },
    favourite_test: [{ type: String, required: true, trim: true }], //PREGUNTAR SI CONVIENE POPULAR A RIESGO DE QUE EL OBJETO QUEDE INMENSO O DIRECTAMENTE HACER OTRO MODELO TEST MAS CORTO QUE TENGA LA INFO Q NECESITAMOS AQUÍ
    created_test: [{ type: String, trim: true }], //LO MISMO Q ARRIBA
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
    followed_users: [
      {
        username: { type: String, trim: true },
        user_id: { type: String, trim: true },
      },
    ],
    following_users: [
      {
        username: { type: String, trim: true },
        user_id: { type: String, trim: true },
      },
    ],
    avatar: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    banner: { type: String, trim: true },
    level: { type: Number, required: true, trim: true },
    next_level: { type: Number, required: true, trim: true },
    tests_played: [{ type: Number, trim: true }],
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achivement' }],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
const User = mongoose.model('Test', UserSchema);
module.exports = User;
