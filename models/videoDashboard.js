const mongoose = require('mongoose');
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };

const VideoDashboardSchema = new Schema({
    title: String,
    videoId: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

module.exports = mongoose.model('VideoDashboard', VideoDashboardSchema);