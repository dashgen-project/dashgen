const express = require('express');
const router = express.Router();
const videoDashboards = require('../controllers/videoDashboards');
const {
    isVideoDashboardAuthor,
    isLoggedIn,
    validateNewVideoDashboard,
    validateEditVideoDashboard,
    renderError
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(videoDashboards.index), renderError)
    .post(isLoggedIn, validateNewVideoDashboard, wrapAsync(videoDashboards.createVideoDashboard), renderError);

router.route('/new')
    .get(isLoggedIn, wrapAsync(videoDashboards.renderNewVideoDashboardForm), renderError);

router.route('/:id')
    .get(isLoggedIn, wrapAsync(videoDashboards.showVideoDashboard), renderError)
    .put(isLoggedIn, isVideoDashboardAuthor, validateEditVideoDashboard, wrapAsync(videoDashboards.updateVideoDashboard), renderError)
    .delete(isLoggedIn, isVideoDashboardAuthor, wrapAsync(videoDashboards.deleteVideoDashboard), renderError);

router.route('/:id/dash')
    .get(wrapAsync(videoDashboards.renderVideoDashboard), renderError);

module.exports = router;