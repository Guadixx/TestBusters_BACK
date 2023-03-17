const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const validator = require('validator');
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    admin: { type: Boolean, default: false },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword, 'Password not valid'],
    },
    favourite_featuredTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeaturedTest' }],      //EN EL CONTROLADOR DE FAVORITOS DEL TEST
    favourite_genericTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest'  }],
    created_featuredTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FeaturedTest'  }],          //EN EL CREATE DE CADA TEST
    created_genericTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest'  }],
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],                              //EN EL CONTROLADOR DE ACABAR EL TEST JUNTO CON LEVEL NEXT Y PLAYED
    followed_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],                    //OTRO CONTROLADOR PARA FOLLOWED Y FOLLOWING DEL MISMO ROLLO QUE EL DE LOS ME GUSTA
    following_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar: { type: String },
    bio: { type: String, trim: true },
    banner: { type: String },
    level: { type: Array, default: [0, 0] },                                                 
    next_level: { type: Number, default: 100 },
    tests_played: { type: Number, default: 0 },
    achievements: [    
      { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' },                              //ACHIEVEMENTES AL ACABAR TEST, AL CREAR Y EN AMBOS COMPROBAR EL NUMERO DE LOGROS
    ],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
/* UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
}); */
const User = mongoose.model('User', UserSchema);
module.exports = User;
