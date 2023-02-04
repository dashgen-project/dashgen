/**
 * @file Video dashboards controllers
 */

const VideoDashboard = require('../models/videoDashboard'); // require mongoose model
const axios = require('axios'); // require axios to perform http requests
const youtubeApiKey = process.env.YOUTUBE_API_KEY; // get yt api key to use yt api
const chapters = require('../utils/chapters'); // require chapters utilities

// show all video dashboards of specific user
module.exports.index = async (req, res) => {
    const dashboards = await VideoDashboard.find({ author: req.user._id });
    res.render('videoDashboards', { dashboards });
}

// render new video dashboard form
module.exports.renderNewVideoDashboardForm = async (req, res) => {
    res.render('videoDashboards/new');
}

// create video dashboard
module.exports.createVideoDashboard = async (req, res, next) => {
    const { videoUrl } = req.body.videoDashboard;
    videoId = videoUrl.substring(17); // expected format: https://youtu.be/YYQ02OP5h00

    // get title and id from the videos via yt api
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

    await dashboard.save(); // save to the database
    req.flash('success', 'Dashboard criado com sucesso!');
    res.redirect(`/videoDashboards/${dashboard._id}`);
}

// render edit video dashboard page
module.exports.showVideoDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await VideoDashboard.findById(id)
        .populate('author');
    res.render('videoDashboards/show', { dashboard });
}

// update video dashboard
module.exports.updateVideoDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    await VideoDashboard.findByIdAndUpdate(id, { ...req.body.videoDashboard });
    req.flash('success', 'Dashboard editado com sucesso!');
    res.redirect(`/videoDashboards/${id}`);
}

// delete video dashboard
module.exports.deleteVideoDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    await VideoDashboard.deleteOne({ _id: id }); // delete document from the database
    res.redirect('/videoDashboards');
}


// render video dashboard
module.exports.renderVideoDashboard = async (req, res) => {
    const { id } = req.params; // get information from request parameters
    const dashboard = await VideoDashboard.findById(id); // find document in the database
    const { videoId } = dashboard;
    const chaptersData = await chapters.getChaptersData(videoId);
    res.render('dashboards/videoDashboard', { dashboard, chaptersData });
}