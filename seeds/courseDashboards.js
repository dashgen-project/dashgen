/**
 * @file Populates database for testing (currently not being used)
 */

const mongoose = require('mongoose');
const CourseDashboard = require('../models/courseDashboard');

main().catch(err => console.log(err));

async function main() {
    const connection = await mongoose.connect('mongodb://localhost:27017/dashgen');
    const courseDashboard = new CourseDashboard({
        title: 'dash title',
        playlistId: 'PLxI8Can9yAHevRkQnSgviIgnzCH3Nss_Y',
        environmentUrl: 'environmenturl.com',
        forumUrl: 'forumurl.com',
        videos: [
            {
                title: 'video title 1',
                videoId: 'pretendthisisavideoid',
                supportMaterial: [
                    {
                        materialUrl: 'materialurl1.com',
                    },
                    {
                        materialUrl: 'materialurl2.com',
                    }
                ],
                inClassExercises: [
                    {
                        exercisesUrl: 'exercisesurl1.com'
                    },
                    {
                        exercisesUrl: 'exercisesurl2.com'
                    }
                ],
                outOfClassExercises: [
                    {
                        exercisesUrl: 'exercisesurl1.com'
                    },
                    {
                        exercisesUrl: 'exercisesurl2.com'
                    }
                ]
            }
        ]
    });

    await playlistDashboard.save(); // save to the database
    mongoose.connection.close();
}