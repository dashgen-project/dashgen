/**
 * @file Playlist dashboard model
 */

const mongoose = require('mongoose'); // require mongoose to create model
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } }; // allow virtuals (https://mongoosejs.com/docs/tutorials/virtuals.html)


// create playlist dashboard model
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