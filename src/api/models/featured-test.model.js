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
        average: { _5: { type: Number }, _10: { type: Number }, _15: { type: Number }, _20: { type: Number }, _25: { type: Number }, _30: { type: Number }, _35: { type: Number }, _40: { type: Number }, _45: { type: Number }, _50: { type: Number }, _55: { type: Number }, _60: { type: Number }, _65: { type: Number }, _70: { type: Number }, _75: { type: Number }, _80: { type: Number }, _85: { type: Number }, _90: { type: Number }, _95: { type: Number }, _100: { type: Number } },
        random: { type: Boolean, required: true },
        comments_enabled: { type: Boolean, required: true },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        times_played: { type: Number, required: true },
        times_favorite: { type: Number, required: true },
        rating: [{ type: Number, required: true }],
        leaderboard: {
            first: { user_id: { type: String }, user: { type: String }, score: { type: String } },
            second: { user_id: { type: String }, user: { type: String }, score: { type: String } },
            third: { user_id: { type: String }, user: { type: String }, score: { type: String } }
        }
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