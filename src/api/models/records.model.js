const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema(
    {
        score: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, trim: true }
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
);
const Record = mongoose.model('Record', TestSchema);
module.exports = Record;