const mongoose = require('mongoose');
const SupportMaterial = require('./supportMaterial');
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
    ]
}, opts);

CourseDashboardSchema.post('findOneAndDelete', async doc => {
    if (doc) {
        for (let video of doc.videos) {
            await SupportMaterial.remove({ _id: { $in: video.supportMaterial } });
        }
        await Video.remove({ _id: { $in: doc.videos } });
    }
});

module.exports = mongoose.model('CourseDashboard', CourseDashboardSchema);