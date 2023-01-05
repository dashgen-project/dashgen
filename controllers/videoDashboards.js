const VideoDashboard = require('../models/videoDashboard');
const axios = require('axios');
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const chapters = require('../utils/chapters');

module.exports.index = async (req, res) => {
    const dashboards = await VideoDashboard.find({ author: req.user._id });
    res.render('videoDashboards', { dashboards });
}

module.exports.renderNewVideoDashboardForm = async (req, res) => {
    res.render('videoDashboards/new');
}

module.exports.createVideoDashboard = async (req, res) => {
    const { videoUrl } = req.body.videoDashboard;
    // const queryString = videoUrl.substring(videoUrl.indexOf('?'));
    // const urlParams = new URLSearchParams(queryString);
    // const videoId = urlParams.getAll('v')[0];
    videoId = videoUrl.substring(17);
    console.log(videoId);
    const videoData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`,
        { headers: { 'Accept': 'application/json' } }
    );
    const title = videoData.data.items[0].snippet.title;
    const dashboard = new VideoDashboard({
        title,
        videoId,
        author: req.user._id
    });
    await dashboard.save();
    req.flash('success', 'Dashboard criado com sucesso!');
    res.redirect(`/videoDashboards/${dashboard._id}`);
}

module.exports.showVideoDashboard = async (req, res) => {
    const { id } = req.params;
    const dashboard = await VideoDashboard.findById(id)
        .populate('author');
    res.render('videoDashboards/show', { dashboard });
}

module.exports.updateVideoDashboard = async (req, res) => {
    const { id } = req.params;
    await VideoDashboard.findByIdAndUpdate(id, { ...req.body.videoDashboard });
    req.flash('success', 'Dashboard editado com sucesso!');
    res.redirect(`/videoDashboards/${id}`);
}

module.exports.deleteVideoDashboard = async (req, res) => {
    const { id } = req.params;
    await VideoDashboard.deleteOne({ _id: id });
    res.redirect('/videoDashboards');
}

module.exports.renderVideoDashboard = async (req, res) => {
    const { id } = req.params;
    const dashboard = await VideoDashboard.findById(id);
    const { videoId } = dashboard;
    const chaptersData = await chapters.getChaptersData(videoId);
    res.render('dashboards/videoDashboard', { dashboard, chaptersData });
}