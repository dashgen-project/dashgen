/**
 * @file Playlist dashboard controllers
 */

const PlaylistDashboard = require('../models/playlistDashboard'); // require mongoose model
const axios = require('axios'); // require axios to perform http requests
const youtubeApiKey = process.env.YOUTUBE_API_KEY; // get yt api key from environment variables
const chapters = require('../utils/chapters'); // require chapters utilities

// show all the playlist dashboards from specific user
module.exports.index = async (req, res) => {
    const dashboards = await PlaylistDashboard.find({ author: req.user._id }); // find dashboards in the database
    res.render('playlistDashboards', { dashboards });
}

// render new playlist dashboard form
module.exports.renderNewPlaylistDashboardForm = async (req, res) => {
    res.render('playlistDashboards/new');
}

// create playlist dashboard
module.exports.createPlaylistDashboard = async (req, res) => {
    // get playlist id to use with youtube api
    const { playlistUrl } = req.body.playlistDashboard;
    const queryString = playlistUrl.substring(playlistUrl.indexOf('?'));
    const urlParams = new URLSearchParams(queryString);
    const playlistId = urlParams.getAll('list')[0];

    // get playlist title
    const playlistData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${youtubeApiKey}`,
        { headers: { 'Accept': 'application/json' } }
    );
    const title = playlistData.data.items[0].snippet.title;
    const dashboard = new PlaylistDashboard({
        title,
        playlistId,
        author: req.user._id
    });
    await dashboard.save(); // save to the database
    res.redirect(`/playlistDashboards/${dashboard._id}`); // redirect to edit dashboard page
}

// show edit playlist dashboard page
module.exports.showPlaylistDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await PlaylistDashboard.findById(id)
        .populate('author');

    // get titles and ids from the videos via youtube api
    const videosData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${dashboard.playlistId}&key=${youtubeApiKey}&maxResults=99`,
        { headers: { 'Accept': 'application/json' } }
    );
    let videos = [];
    for (let video of videosData.data.items) {
        videos.push({
            title: video.snippet.title,
            videoId: video.snippet.resourceId.videoId
        });
    }
    res.render('playlistDashboards/show', { dashboard, videos });
}

// update playlist dashboard
module.exports.updatePlaylistDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    await PlaylistDashboard.findByIdAndUpdate(id, { ...req.body.playlistDashboard });
    res.redirect(`/playlistDashboards/${id}`);
}

// delete playlist dashboard
module.exports.deletePlaylistDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    await PlaylistDashboard.deleteOne({ _id: id }); // delete document from the database
    res.redirect('/playlistDashboards');
}

// render playlist dashboard
module.exports.renderPlaylistDashboard = async (req, res) => {
    const { id, classIndex } = req.params; // get information from request parameters
    const dashboard = await PlaylistDashboard.findById(id); // find document in the database

     // get titles and ids from the videos via youtube api
    const videosData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${dashboard.playlistId}&key=${youtubeApiKey}&maxResults=99`,
        { headers: { 'Accept': 'application/json' } }
    );
    let videos = [];
    for (let video of videosData.data.items) {
        videos.push({
            title: video.snippet.title,
            videoId: video.snippet.resourceId.videoId
        });
    }
    const { videoId } = videos[classIndex];
    const chaptersData = await chapters.getChaptersData(videoId);
    res.render('dashboards/playlistDashboard', { dashboard, classIndex, chaptersData, videos });
}