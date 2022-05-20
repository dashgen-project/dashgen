const express = require('express');
const router = express.Router();
const videoDashboards = require('../controllers/videoDashboards');
const {
    isVideoDashboardAuthor,
    isLoggedIn,
    validateNewVideoDashboard,
    validateEditVideoDashboard
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(videoDashboards.index))
    .post(isLoggedIn, validateNewVideoDashboard, wrapAsync(videoDashboards.createVideoDashboard));

router.route('/new')
    .get(isLoggedIn, wrapAsync(videoDashboards.renderNewVideoDashboardForm));

router.route('/:id')
    .get(isLoggedIn, wrapAsync(videoDashboards.showVideoDashboard))
    .put(isLoggedIn, isVideoDashboardAuthor, validateEditVideoDashboard, wrapAsync(videoDashboards.updateVideoDashboard))
    .delete(isLoggedIn, isVideoDashboardAuthor, wrapAsync(videoDashboards.deleteVideoDashboard));

router.route('/:id/dash')
    .get(wrapAsync(videoDashboards.renderVideoDashboard));

module.exports = router;