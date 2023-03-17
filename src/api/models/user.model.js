const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const validator = require('validator')
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    admin: {type: Boolean, default: false},
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
    favourite_tests: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FeaturedTest' } |
        { type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest' },
    ],
    created_tests: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FeaturedTest' } |
        { type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest' },
    ],
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
    followed_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar: { type: String},
    bio: { type: String, trim: true },
    banner: { type: String},
    level: [{ type: Number, default: 0}],
    next_level: { type: Number, default: 100},
    tests_played: { type: Number, default: 0},
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
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
