/**
 * @file playlistDashboards routes (specify what happens when server receives requests to /playlistDashboards/...)
 */

const express = require('express');
const router = express.Router();
const playlistDashboards = require('../controllers/playlistDashboards');
const {
    isPlaylistDashboardAuthor,
    isLoggedIn,
    validateNewPlaylistDashboard,
    validateEditPlaylistDashboard,
    renderError
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(playlistDashboards.index), renderError)
    .post(isLoggedIn, validateNewPlaylistDashboard, wrapAsync(playlistDashboards.createPlaylistDashboard), renderError);

router.route('/new')
    .get(isLoggedIn, wrapAsync(playlistDashboards.renderNewPlaylistDashboardForm), renderError);

router.route('/:id')
    .get(isLoggedIn, wrapAsync(playlistDashboards.showPlaylistDashboard), renderError)
    .put(isLoggedIn, isPlaylistDashboardAuthor, validateEditPlaylistDashboard, wrapAsync(playlistDashboards.updatePlaylistDashboard), renderError)
    .delete(isLoggedIn, isPlaylistDashboardAuthor, wrapAsync(playlistDashboards.deletePlaylistDashboard), renderError);

router.route('/:id/dash/:classIndex')
    .get(wrapAsync(playlistDashboards.renderPlaylistDashboard), renderError);

module.exports = router;