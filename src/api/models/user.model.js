const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const validator = require('validator')
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
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
    favourite_test: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FeatureTest' } |
        { type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest' },
    ],
    created_test: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'FeatureTest' } |
        { type: mongoose.Schema.Types.ObjectId, ref: 'GenericTest' },
    ],
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
    followed_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    avatar: { type: String, required: true, trim: true },
    bio: { type: String, trim: true },
    banner: { type: String, trim: true },
    level: [{ type: Number, required: true }],
    next_level: { type: Number, required: true, trim: true },
    tests_played: { type: Number, trim: true },
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achivement' }],
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
