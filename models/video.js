const mongoose = require('mongoose');
const { Schema } = mongoose;
const SupportMaterial = require('./supportMaterial');

const VideoSchema = new Schema({
    title: String,
    videoId: String,
    // supportMaterial: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'SupportMaterial'
    //     }
    // ],
    supportMaterial: [
        {
            type: String
        }
    ],
    inClassExercises: [
        {
            exercisesUrl: String
        }
    ],
    outOfClassExercises: [
        {
            exercisesUrl: String
        }
    ]
});

module.exports = mongoose.model('Video', VideoSchema);