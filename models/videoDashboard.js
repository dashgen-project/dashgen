/**
 * @file Video dashboard model
 */

const mongoose = require('mongoose'); // require mongoose to create model
const { Schema } = mongoose;
const opts = { toJSON: { virtuals: true } }; // allow virtuals (https://mongoosejs.com/docs/tutorials/virtuals.html)

// Create video dashboard model
const VideoDashboardSchema = new Schema({
    title: String,
    videoId: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

module.exports = mongoose.model('VideoDashboard', VideoDashboardSchema);