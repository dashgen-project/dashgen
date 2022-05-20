const mongoose = require('mongoose');
const { Schema } = mongoose;
const Video = require('./video');

const opts = { toJSON: { virtuals: true } };

const CourseDashboardSchema = new Schema({
    title: String,
    playlistId: {
        type: String,
        required: true
    },
    environmentUrl: String,
    forumUrl: String,
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, opts);

CourseDashboardSchema.post('findOneAndDelete', async doc => {
    if (doc) {
        await Video.remove({ _id: { $in: doc.videos } });
    }
});

module.exports = mongoose.model('CourseDashboard', CourseDashboardSchema);