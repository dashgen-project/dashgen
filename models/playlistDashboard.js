const mongoose = require('mongoose');
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } };

const PlaylistDashboardSchema = new Schema({
    title: String,
    playlistId: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

module.exports = mongoose.model('PlaylistDashboard', PlaylistDashboardSchema);