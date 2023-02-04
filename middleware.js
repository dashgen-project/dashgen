/**
 * @file Middleware functions 
 * @author Henrique Sander Lourenco
 * 
 */

// Requires
const CourseDashboard = require("./models/courseDashboard");
const PlaylistDashboard = require("./models/playlistDashboard");
const VideoDashboard = require("./models/videoDashboard");
const {
    newCourseDashboardSchema,
    editCourseDashboardSchema,
    newPlaylistDashboardSchema,
    editPlaylistDashboardSchema,
    newVideoDashboardSchema,
    editVideoDashboardSchema,
    editClassSchema,
    videoSchema,
    loginSchema,
    userSchema,
    forgotPwdEmailSchema,
    forgotPwdChangeSchema
} = require('./schemas');
const ExpressError = require('./utils/ExpressError');

// check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Ops, parece que você precisa entrar na sua conta para acessar essa página.');
        return res.redirect('/');
    }
    next();
}

// check if user is not logged in
module.exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    // req.flash('error', 'Você precisa sair da sua conta para acessar essa página.');
    res.redirect('/');
}

// check if user is the author of the course dashboard they are trying to edit
module.exports.isCourseDashboardAuthor = async (req, res, next) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await CourseDashboard.findById(id); // find document in the database
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

// check if user is the author of the playlist dashboard they are trying to edit
module.exports.isPlaylistDashboardAuthor = async (req, res, next) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await PlaylistDashboard.findById(id); // find document in the database
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

// check if user is the author of the video dashboard they are trying to edit
module.exports.isVideoDashboardAuthor = async (req, res, next) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await VideoDashboard.findById(id); // find document in the database
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

// validate new course dashboard request
module.exports.validateNewCourseDashboard = (req, res, next) => {
    const { error } = newCourseDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}
// validate edit course dashboard request
module.exports.validateEditCourseDashboard = (req, res, next) => {
    const { error } = editCourseDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate edit class request
module.exports.validateEditClass = (req, res, next) => {
    const { error } = editClassSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate new playlist dashboard request
module.exports.validateNewPlaylistDashboard = (req, res, next) => {
    const { error } = newPlaylistDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate edit playlist dashboard request
module.exports.validateEditPlaylistDashboard = (req, res, next) => {
    const { error } = editPlaylistDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate new video dashboard request
module.exports.validateNewVideoDashboard = (req, res, next) => {
    const { error } = newVideoDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate edit video dashboard request
module.exports.validateEditVideoDashboard = (req, res, next) => {
    const { error } = editVideoDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// deprecated
module.exports.validateVideo = (req, res, next) => {
    const { error } = videoSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate login request
module.exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate register request
module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// renders error page
module.exports.renderError = (req, res, next) => {
    message = '';
    res.render('error', { message });
}

// validate forgot pwd request (the one in which the user types their email)
module.exports.validateForgotPwd = (req, res, next) => {
    const { error } = forgotPwdEmailSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

// validate change pwd request
module.exports.validateChangePwd = (req, res, next) => {
    const { error } = forgotPwdChangeSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n');
        res.render('error', { message });
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}