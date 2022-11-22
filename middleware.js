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
    userSchema
} = require('./schemas')
const ExpressError = require('./utils/ExpressError')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Ops, parece que você precisa entrar na sua conta para acessar essa página.');
        return res.redirect('/');
    }
    next();
}

module.exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Você precisa sair da sua conta para acessar essa página.');
    res.redirect('back');
}

module.exports.isCourseDashboardAuthor = async (req, res, next) => {
    const { id } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

module.exports.isPlaylistDashboardAuthor = async (req, res, next) => {
    const { id } = req.params;
    const dashboard = await PlaylistDashboard.findById(id);
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

module.exports.isVideoDashboardAuthor = async (req, res, next) => {
    const { id } = req.params;
    const dashboard = await VideoDashboard.findById(id);
    if (!dashboard.author.equals(req.user._id)) {
        req.flash('error', 'Ops, parece que você não é o autor desse dashboard.');
        return res.redirect('/');
    }
    next();
}

module.exports.validateNewCourseDashboard = (req, res, next) => {
    const { error } = newCourseDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateEditCourseDashboard = (req, res, next) => {
    const { error } = editCourseDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateEditClass = (req, res, next) => {
    const { error } = editClassSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateNewPlaylistDashboard = (req, res, next) => {
    const { error } = newPlaylistDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateEditPlaylistDashboard = (req, res, next) => {
    const { error } = editPlaylistDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateNewVideoDashboard = (req, res, next) => {
    const { error } = newVideoDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateEditVideoDashboard = (req, res, next) => {
    const { error } = editVideoDashboardSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateVideo = (req, res, next) => {
    const { error } = videoSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(',\n')
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}