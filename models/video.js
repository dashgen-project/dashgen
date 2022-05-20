const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
    title: String,
    videoId: String,
    supportMaterial: [
        {
            type: String
        }
    ],
    inClassExercises: [
        {
            type: String
        }
    ],
    outOfClassExercises: [
        {
            type: String
        }
    ]
});

module.exports = mongoose.model('Video', VideoSchema);