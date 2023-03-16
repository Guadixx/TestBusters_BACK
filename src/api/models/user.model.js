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
    followed_users: [{ type: String, trim: true }], //QUIZÁS MODELO USER ÚNICAMENTE CON EL NOMBRE DE USUARIO Y EL ID PARA CREAR EL LINK Y AHORRARNOS LLAMADAS
    following_users: [{ type: String, trim: true }], //LO MISMO Q ARRIBA
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
