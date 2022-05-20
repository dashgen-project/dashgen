const express = require('express');
const router = express.Router();
const playlistDashboards = require('../controllers/playlistDashboards');
const {
    isPlaylistDashboardAuthor,
    isLoggedIn,
    validateNewPlaylistDashboard,
    validateEditPlaylistDashboard
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(playlistDashboards.index))
    .post(isLoggedIn, validateNewPlaylistDashboard, wrapAsync(playlistDashboards.createPlaylistDashboard));

router.route('/new')
    .get(isLoggedIn, wrapAsync(playlistDashboards.renderNewPlaylistDashboardForm));

router.route('/:id')
    .get(isLoggedIn, wrapAsync(playlistDashboards.showPlaylistDashboard))
    .put(isLoggedIn, isPlaylistDashboardAuthor, validateEditPlaylistDashboard, wrapAsync(playlistDashboards.updatePlaylistDashboard))
    .delete(isLoggedIn, isPlaylistDashboardAuthor, wrapAsync(playlistDashboards.deletePlaylistDashboard));

router.route('/:id/dash/:videoIndex')
    .get(wrapAsync(playlistDashboards.renderPlaylistDashboard));

module.exports = router;