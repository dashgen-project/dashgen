/**
 * @file Schemas to validate forms (protection against XSS)
 * @author Henrique Sander Lourenco
 * 
 */

// Requires
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// Joi extension to prevent XSS
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

const Joi = BaseJoi.extend(extension); // Use Joi with the created extension

// new course dashboard schema
module.exports.newCourseDashboardSchema = Joi.object({
    courseDashboard: Joi.object({
        playlistUrl: Joi.string().required().escapeHTML().min(0).max(100)
    }).required()
});

// edit course dashboard schema
module.exports.editCourseDashboardSchema = Joi.object({
    dashboard: Joi.object({
        title: Joi.string().required().escapeHTML().min(0).max(100),
        environmentUrl: Joi.string().allow('').escapeHTML().min(0).max(100),
        forumUrl: Joi.string().allow('').escapeHTML().min(0).max(100),
        numberOfClasses: Joi.number().min(0).max(500),
        classes: Joi.array().items(Joi.object({
            title: Joi.string().allow('').escapeHTML().min(0).max(100),
            classNumber: Joi.number().min(0).max(500),
            preClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                })
            }),
            forClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                })
            }),
            postClassMaterial: Joi.object({
                essential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                }),
                nonEssential: Joi.object({
                    video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                    externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
                })
            })
        }))
    }).required()
});

// edit class schema
module.exports.editClassSchema = Joi.object({
    thisClass: Joi.object({
        title: Joi.string().allow('').escapeHTML().min(0).max(100),
        classNumber: Joi.number(),
        preClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            })
        }),
        forClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            })
        }),
        postClassMaterial: Joi.object({
            essential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            }),
            nonEssential: Joi.object({
                video: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                slide: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                exerciseList: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                reading: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                quizz: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
                externalLink: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
            })
        })
    }).required()
});

// new playlist dashboard schema
module.exports.newPlaylistDashboardSchema = Joi.object({
    playlistDashboard: Joi.object({
        playlistUrl: Joi.string().required().escapeHTML().min(0).max(100)
    }).required()
});

// new playlist dashboard schema
module.exports.editPlaylistDashboardSchema = Joi.object({
    playlistDashboard: Joi.object({
        title: Joi.string().required().escapeHTML().min(0).max(100),
    }).required()
});

// new video dashboard schema
module.exports.newVideoDashboardSchema = Joi.object({
    videoDashboard: Joi.object({
        videoUrl: Joi.string().required().escapeHTML().min(0).max(100),
    }).required()
});

// edit video dashboard schema
module.exports.editVideoDashboardSchema = Joi.object({
    videoDashboard: Joi.object({
        title: Joi.string().required().escapeHTML().min(0).max(100),
    }).required()
});

// deprecated
module.exports.videoSchema = Joi.object({
    video: Joi.object({
        supportMaterial: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
        inClassExercises: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100)),
        outOfClassExercises: Joi.array().items(Joi.string().allow('').escapeHTML().min(0).max(100))
    }).required()
});

// login schema
module.exports.loginSchema = Joi.object({
    username: Joi.string().escapeHTML().min(0).max(100),
    password: Joi.string().escapeHTML().min(0).max(100)
});

// register schema
module.exports.userSchema = Joi.object({
    username: Joi.string().email().escapeHTML().min(0).max(100),
    password: Joi.string().min(5).escapeHTML().max(100),
    emailConfirmation: Joi.string().email().escapeHTML().min(0).max(100)
});

// forgot password form schema
module.exports.forgotPwdEmailSchema = Joi.object({
    email: Joi.string().email().escapeHTML().min(0).max(100).required()
});

// change password form schema
module.exports.forgotPwdChangeSchema = Joi.object({
    code: Joi.string().escapeHTML().min(0).max(100).required(),
    password: Joi.string().escapeHTML().min(0).max(100).required(),
    email: Joi.string().email().escapeHTML().min(0).max(100).required()
});