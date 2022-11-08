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
    numberOfClasses: Number,
    environmentUrl: String,
    forumUrl: String,
    classes: [{
        title: String,
        classNumber: {
            type: Number,
            required: true
        },
        preClassMaterial: {
            essential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            },
            nonEssential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            }
        },
        forClassMaterial: {
            essential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            },
            nonEssential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            }
        },
        postClassMaterial: {
            essential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            },
            nonEssential: {
                video: [{ type: String }],
                slide: [{ type: String }],
                exerciseList: [{ type: String }],
                reading: [{ type: String }],
                quizz: [{ type: String }],
                externalLink: [{ type: String }]
            }
        },
    }],
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