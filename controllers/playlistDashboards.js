const PlaylistDashboard = require('../models/playlistDashboard');
const axios = require('axios');
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const chapters = require('../utils/chapters');

module.exports.index = async (req, res) => {
    const dashboards = await PlaylistDashboard.find({ author: req.user._id });
    res.render('playlistDashboards', { dashboards });
}

module.exports.renderNewPlaylistDashboardForm = async (req, res) => {
    res.render('playlistDashboards/new');
}

module.exports.createPlaylistDashboard = async (req, res) => {
    const { playlistUrl } = req.body.playlistDashboard;
    const queryString = playlistUrl.substring(playlistUrl.indexOf('?'));
    const urlParams = new URLSearchParams(queryString);
    const playlistId = urlParams.getAll('list')[0];
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
    await dashboard.save();
    res.redirect(`/playlistDashboards/${dashboard._id}`);
}

module.exports.showPlaylistDashboard = async (req, res) => {
    const { id } = req.params;
    const dashboard = await PlaylistDashboard.findById(id)
        .populate('author');
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

module.exports.updatePlaylistDashboard = async (req, res) => {
    const { id } = req.params;
    await PlaylistDashboard.findByIdAndUpdate(id, { ...req.body.dashboard });
    res.redirect(`/playlistDashboards/${id}`);
}

module.exports.deletePlaylistDashboard = async (req, res) => {
    const { id } = req.params;
    await PlaylistDashboard.deleteOne({ _id: id });
    res.redirect('/playlistDashboards');
}

module.exports.renderPlaylistDashboard = async (req, res) => {
    const { id, classIndex } = req.params;
    const dashboard = await PlaylistDashboard.findById(id);
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