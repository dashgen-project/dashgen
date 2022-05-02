if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const CourseDashboard = require('./models/courseDashboard');
const Video = require('./models/video');
// const SupportMaterial = require('./models/supportMaterial');
// const ejsMate = require('ejs-mate');
const ejs = require('ejs');
const methodOverride = require('method-override');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/dashgen');
}

// app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// app.use(expressLayouts);

app.get('/', (req, res) => {
    // if (isLoggedIn) {res.render('home1')} else {res.render('home2')}
    res.render('home');
});

app.get('/dashboards', async (req, res) => {
    // if (isLoggedIn) {res.render('home1')} else {res.render('home2')}
    const courseDashboards = await CourseDashboard.find({});
    res.render('dashboards', { courseDashboards });
});

app.post('/courseDashboards', async (req, res) => {
    const { playlistUrl } = req.body;
    const queryString = playlistUrl.substring(playlistUrl.indexOf('?'));
    const urlParams = new URLSearchParams(queryString);
    const playlistId = urlParams.getAll('list')[0];
    const videosData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
        { headers: { 'Accept': 'application/json' } }
    );
    const playlistData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${youtubeApiKey}`,
        { headers: { 'Accept': 'application/json' } }
    );
    const title = playlistData.data.items[0].snippet.title;
    const videos = [];
    for (let i = 0; i < videosData.data.pageInfo.totalResults; i++) {
        videos[i] = new Video({
            title: videosData.data.items[i].snippet.title,
            videoId: videosData.data.items[i].snippet.resourceId.videoId
        });
        await videos[i].save();
    }
    const dashboard = new CourseDashboard({
        title,
        playlistId,
        videos
    });
    await dashboard.save();
    res.redirect('/dashboards');
});

app.get('/courseDashboards/new', (req, res) => {
    res.render('courseDashboards/new');
});

app.put('/courseDashboards/:id', async (req, res) => {
    const { id } = req.params;
    await CourseDashboard.findByIdAndUpdate(id, { ...req.body.dashboard });
    res.redirect(`/dashboards`);
});

app.get('/courseDashboards/:id/edit', async (req, res) => {
    const { id } = req.params;
    const dashboard = await CourseDashboard.findById(id)
        .populate({
            path: 'videos',
            populate: {
                path: 'supportMaterial'
            }
        });
    res.render('courseDashboards/edit', { dashboard });
});

app.put('/courseDashboards/:id/:videoId', async (req, res) => {
    const { videoId } = req.params;
    // const supportMaterial = new SupportMaterial({
    //     url: req.body.video.supportMaterial
    // });
    // console.log(supportMaterial);
    // await supportMaterial.save();
    await Video.findByIdAndUpdate(videoId, { supportMaterial: req.body.video.supportMaterial });
    res.redirect(`/dashboards`);
});

app.get('/courseDashboards/:id/:videoId', async (req, res) => {
    const { id, videoId } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    const video = await Video.findById(videoId)
        .populate('supportMaterial');
    res.render('courseDashboards/editVideoInformation', { dashboard, video });
});

app.delete('/courseDashboards/:id', async (req, res) => {
    const { id } = req.params;
    await CourseDashboard.findByIdAndDelete(id);
    res.redirect('/dashboards');
});

app.get('/playlistDashboards/new', (req, res) => {
    res.render('playlistDashboards/new');
});

app.post('/playlistDashboards', async (req, res) => {
    res.redirect('/dashboards');
});

app.get('/videoDashboards/new', (req, res) => {
    res.render('videoDashboards/new');
});

app.post('/videoDashboards', async (req, res) => {
    res.redirect('/dashboards');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});