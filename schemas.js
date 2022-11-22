const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.newCourseDashboardSchema = Joi.object({
    courseDashboard: Joi.object({
        playlistUrl: Joi.string().required().escapeHTML()
    }).required()
});

module.exports.editCourseDashboardSchema = Joi.object({
    dashboard: Joi.object({
        title: Joi.string().required().escapeHTML(),
        environmentUrl: Joi.string().allow('').escapeHTML(),
        forumUrl: Joi.string().allow('').escapeHTML(),
        numberOfClasses: Joi.number(),
        classes: Joi.array().items(Joi.object({
            title: Joi.string().allow('').escapeHTML(),
            classNumber: Joi.number(),
            preClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                })
            }),
            forClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                })
            }),
            postClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
                })
            })
        }))
    }).required()
});

module.exports.editClassSchema = Joi.object({
    thisClass: Joi.object({
        title: Joi.string().allow('').escapeHTML(),
        classNumber: Joi.number(),
        preClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            })
        }),
        forClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            })
        }),
        postClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML()),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML()),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML()),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML()),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML()),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML())
            })
        })
    }).required()
});

module.exports.newPlaylistDashboardSchema = Joi.object({
    playlistDashboard: Joi.object({
        playlistUrl: Joi.string().required().escapeHTML()
    }).required()
});

module.exports.editPlaylistDashboardSchema = Joi.object({
    playlistDashboard: Joi.object({
        title: Joi.string().required().escapeHTML(),
    }).required()
});

module.exports.newVideoDashboardSchema = Joi.object({
    videoDashboard: Joi.object({
        videoUrl: Joi.string().required().escapeHTML(),
    }).required()
});

module.exports.editVideoDashboardSchema = Joi.object({
    videoDashboard: Joi.object({
        title: Joi.string().required().escapeHTML(),
    }).required()
});

module.exports.videoSchema = Joi.object({
    video: Joi.object({
        supportMaterial: Joi.array().items(Joi.string().allow('').escapeHTML()),
        inClassExercises: Joi.array().items(Joi.string().allow('').escapeHTML()),
        outOfClassExercises: Joi.array().items(Joi.string().allow('').escapeHTML())
    }).required()
});

module.exports.loginSchema = Joi.object({
    username: Joi.string().escapeHTML(),
    password: Joi.string().escapeHTML()
});

module.exports.userSchema = Joi.object({
    username: Joi.string().email().escapeHTML(),
    password: Joi.string().min(5).escapeHTML(),
    emailConfirmation: Joi.string().email().escapeHTML()
});