const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        email: { type: String, trim: true, required: true, validate: [validator.isEmail, "Email not valid"] },
        password: { type: String, required: true, trim: true, validate: [validator.isStrongPassword, "Password not valid"] },
        favourite_test: [{ type: String, required: true, trim: true }],
        created_test: [{ type: String, trim: true }],
        records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
        followed_users: [{ type: String, trim: true }],
        following_users: [{ type: String, trim: true }],
        avatar: { type: String, required: true, trim: true },
        bio: { type: String, trim: true },
        banner: { type: String, trim: true },
        level: { type: Number, required: true, trim: true },
        next_level: { type: Number, required: true, trim: true },
        tests_played: [{ type: Number, trim: true }],
        achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achivement" }]
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