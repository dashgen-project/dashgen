const CourseDashboard = require('../models/courseDashboard');
const Video = require('../models/video');
const axios = require('axios');
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const chapters = require('../utils/chapters');
const checkUrl = require('../utils/checkUrl');

module.exports.index = async (req, res) => {
    const dashboards = await CourseDashboard.find({ author: req.user._id });
    res.render('courseDashboards', { dashboards });
}

module.exports.renderNewCourseDashboardForm = async (req, res) => {
    res.render('courseDashboards/new');
}

module.exports.createCourseDashboard = async (req, res) => {
    const { playlistUrl } = req.body.courseDashboard;
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
    const numberOfClasses = 0;
    const dashboard = new CourseDashboard({
        title,
        playlistId,
        numberOfClasses,
        videos,
        author: req.user._id
    });
    await dashboard.save();
    req.flash('success', 'Dashboard criado com sucesso!');
    res.redirect(`/coursedashboards/${dashboard._id}`);
}

module.exports.showCourseDashboard = async (req, res) => {
    const { id } = req.params;
    const dashboard = await CourseDashboard.findById(id)
        .populate('videos')
        .populate('author');
    const videosData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${dashboard.playlistId}&key=${youtubeApiKey}&maxResults=99`,
        { headers: { 'Accept': 'application/json' } }
    );
    if (videosData.data.pageInfo.totalResults > dashboard.videos.length - 1) {
        let newVideos = [];
        for (let i = 0; i < videosData.data.pageInfo.totalResults - dashboard.videos.length; i++) {
            newVideos[i] = new Video({
                title: videosData.data.items[i + dashboard.videos.length].snippet.title,
                videoId: videosData.data.items[i + dashboard.videos.length].snippet.resourceId.videoId
            });
            await newVideos[i].save();
        }
        await CourseDashboard.updateOne(
            { _id: dashboard._id },
            { $push: { videos: newVideos } }
        );
    }
    let nonMoodleMaterial = 0;
    if (!checkUrl.isMoodle(dashboard.classes)) {
        nonMoodleMaterial = 1;
    }
    res.render('courseDashboards/show', { dashboard, nonMoodleMaterial });
}

module.exports.updateCourseDashboard = async (req, res) => {
    const { id } = req.params;
    // await CourseDashboard.findByIdAndUpdate(id, { ...req.body.dashboard });
    const dashboard = await CourseDashboard.findById(id);
    dashboard.title = req.body.dashboard.title;
    dashboard.environmentUrl = req.body.dashboard.environmentUrl;
    dashboard.forumUrl = req.body.dashboard.forumUrl;
    await dashboard.save();
    req.flash('success', 'Dashboard salvo com sucesso!');
    res.redirect(`/courseDashboards/${id}`);
}

module.exports.showMaterial = async (req, res) => {
    const { id } = req.params;
    const dashboard = await CourseDashboard.findById(id);
}

module.exports.deleteCourseDashboard = async (req, res) => {
    const { id } = req.params;
    await CourseDashboard.deleteOne({ _id: id });
    req.flash('success', 'Dashboard deletado com sucesso!');
    res.redirect('/courseDashboards');
}

module.exports.renderEditClassForm = async (req, res) => {
    const { id, classNum } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    // const numClasses = dashboard.classes.length;
    // dashboard.classes.push({ classNumber: numClasses });
    // await dashboard.save();
    const playlistId = dashboard.playlistId;
    const videosData = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
        { headers: { 'Accept': 'application/json' } }
    );
    let videos = [];
    for (let video of videosData.data.items) {
        let title = video.snippet.title;
        let videoId = video.snippet.resourceId.videoId;
        videos.push({ title, videoId });
    }
    res.render('courseDashboards/editClass', { dashboard, videos, classNum });
}

module.exports.renderEditVideoInformationForm = async (req, res) => {
    const { id, videoId } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    const video = await Video.findById(videoId);
    res.render('courseDashboards/editVideoInformation', { dashboard, video });
}

module.exports.updateVideoInformation = async (req, res) => {
    const { id, videoId } = req.params;
    await Video.findByIdAndUpdate(videoId, {
        supportMaterial: req.body.video.supportMaterial,
        inClassExercises: req.body.video.inClassExercises,
        outOfClassExercises: req.body.video.outOfClassExercises
    });
    req.flash('success', 'Dashboard salvo com sucesso!');
    res.redirect(`/courseDashboards/${id}`);
}

module.exports.updateClassInformation = async (req, res) => {
    const { id, classNum } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    dashboard.classes[classNum] = { ...req.body.thisClass };
    await dashboard.save();
    req.flash('success', 'Aula salva com sucesso!');
    res.redirect(`/courseDashboards/${id}/classes/${classNum}`);
}

module.exports.deleteClass = async (req, res) => {
    const { id, classNum } = req.params;
    const dashboard = await CourseDashboard.findById(id);
    dashboard.classes.splice(classNum, 1);
    for (let i = classNum; i < dashboard.classes.length; i++) {
        dashboard.classes[i].classNumber--;
    }
    await dashboard.save();
    req.flash('success', 'Aula deletada com sucesso!');
    res.redirect(`/courseDashboards/${id}`);
}

module.exports.renderCourseDashboard = async (req, res) => {
    const { id, classIndex } = req.params;


    const dashboard = await CourseDashboard.findById(id);

    if (dashboard.classes.length > 0) {
        const preCEvideoId0 = dashboard.classes[classIndex].preClassMaterial.essential.video[0];
        const preCEvideoId1 = dashboard.classes[classIndex].preClassMaterial.essential.video[1];
        const preCEvideoId2 = dashboard.classes[classIndex].preClassMaterial.essential.video[2];

        const preCNEvideoId0 = dashboard.classes[classIndex].preClassMaterial.nonEssential.video[0];
        const preCNEvideoId1 = dashboard.classes[classIndex].preClassMaterial.nonEssential.video[1];
        const preCNEvideoId2 = dashboard.classes[classIndex].preClassMaterial.nonEssential.video[2];

        const forCEvideoId0 = dashboard.classes[classIndex].forClassMaterial.essential.video[0];
        const forCEvideoId1 = dashboard.classes[classIndex].forClassMaterial.essential.video[1];
        const forCEvideoId2 = dashboard.classes[classIndex].forClassMaterial.essential.video[2];

        const forCNEvideoId1 = dashboard.classes[classIndex].forClassMaterial.nonEssential.video[1];
        const forCNEvideoId2 = dashboard.classes[classIndex].forClassMaterial.nonEssential.video[2];
        const forCNEvideoId0 = dashboard.classes[classIndex].forClassMaterial.nonEssential.video[0];

        const postCEvideoId0 = dashboard.classes[classIndex].postClassMaterial.essential.video[0];
        const postCEvideoId1 = dashboard.classes[classIndex].postClassMaterial.essential.video[1];
        const postCEvideoId2 = dashboard.classes[classIndex].postClassMaterial.essential.video[2];

        const postCNEvideoId0 = dashboard.classes[classIndex].postClassMaterial.nonEssential.video[0];
        const postCNEvideoId1 = dashboard.classes[classIndex].postClassMaterial.nonEssential.video[1];
        const postCNEvideoId2 = dashboard.classes[classIndex].postClassMaterial.nonEssential.video[2];

        const videosIds = {
            preCEvideoId0, preCEvideoId1, preCEvideoId2, preCNEvideoId0, preCNEvideoId1, preCNEvideoId2,
            forCEvideoId0, forCEvideoId1, forCEvideoId2, forCNEvideoId0, forCNEvideoId1, forCNEvideoId2,
            postCEvideoId0, postCEvideoId1, postCEvideoId2, postCNEvideoId0, postCNEvideoId1, postCNEvideoId2
        };

        // const { preCEvideoId } = dashboard.videos[classIndex];
        const preCEchaptersData0 = await chapters.getChaptersData(videosIds.preCEvideoId0);
        const preCEchaptersData1 = await chapters.getChaptersData(videosIds.preCEvideoId1);
        const preCEchaptersData2 = await chapters.getChaptersData(videosIds.preCEvideoId2);

        const preCNEchaptersData0 = await chapters.getChaptersData(videosIds.preCNEvideoId0);
        const preCNEchaptersData1 = await chapters.getChaptersData(videosIds.preCNEvideoId1);
        const preCNEchaptersData2 = await chapters.getChaptersData(videosIds.preCNEvideoId2);

        const forCEchaptersData0 = await chapters.getChaptersData(videosIds.forCEvideoId0);
        const forCEchaptersData1 = await chapters.getChaptersData(videosIds.forCEvideoId1);
        const forCEchaptersData2 = await chapters.getChaptersData(videosIds.forCEvideoId2);

        const forCNEchaptersData0 = await chapters.getChaptersData(videosIds.forCNEvideoId0);
        const forCNEchaptersData1 = await chapters.getChaptersData(videosIds.forCNEvideoId1);
        const forCNEchaptersData2 = await chapters.getChaptersData(videosIds.forCNEvideoId2);

        const postCEchaptersData0 = await chapters.getChaptersData(videosIds.postCEvideoId0);
        const postCEchaptersData1 = await chapters.getChaptersData(videosIds.postCEvideoId1);
        const postCEchaptersData2 = await chapters.getChaptersData(videosIds.postCEvideoId2);

        const postCNEchaptersData0 = await chapters.getChaptersData(videosIds.postCNEvideoId0);
        const postCNEchaptersData1 = await chapters.getChaptersData(videosIds.postCNEvideoId1);
        const postCNEchaptersData2 = await chapters.getChaptersData(videosIds.postCNEvideoId2);

        const chaptersData = {
            preCEchaptersData0, preCEchaptersData1, preCEchaptersData2, preCNEchaptersData0, preCNEchaptersData1, preCNEchaptersData2,
            forCEchaptersData0, forCEchaptersData1, forCEchaptersData2, forCNEchaptersData0, forCNEchaptersData1, forCNEchaptersData2,
            postCEchaptersData0, postCEchaptersData1, postCEchaptersData2, postCNEchaptersData0, postCNEchaptersData1, postCNEchaptersData2
        };

        res.render('dashboards/courseDashboard', { dashboard, classIndex, chaptersData });
    } else {
        res.render('dashboards/noClasses', { id });
    }
}   