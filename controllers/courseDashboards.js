/**
 * @file Course dashboard controllers
 */

// models requires
const CourseDashboard = require('../models/courseDashboard');
const Video = require('../models/video'); // deprecated

const axios = require('axios'); // axios performs http requests

// utilities requires
const chapters = require('../utils/chapters');
const checkUrl = require('../utils/checkUrl');

const youtubeApiKey = process.env.YOUTUBE_API_KEY; // youtube api key in order to use youtube api

// show all course dashboards from an specifc user
module.exports.index = async (req, res) => {
    const dashboards = await CourseDashboard.find({ author: req.user._id }); // get course dashboard from the database
    res.render('courseDashboards', { dashboards }); // render view
}

// render new course dashboard form
module.exports.renderNewCourseDashboardForm = async (req, res) => {
  const scripts = ['checkPlaylistUrl'];
  res.render('courseDashboards/new', { scripts }); // render view
};

// get youtube playlist data via yt api, create dashboard and save to the database
module.exports.createCourseDashboard = async (req, res) => {
  const { playlistUrl } = req.body.courseDashboard;

  // get yt playlist id from playlist url
  const queryString = playlistUrl.substring(playlistUrl.indexOf('?'));
  const urlParams = new URLSearchParams(queryString);
  const playlistId = urlParams.getAll('list')[0];

  // get playlist title
  const playlistData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${youtubeApiKey}`,
    { headers: { Accept: 'application/json' } }
  );
  const title = playlistData.data.items[0].snippet.title;

  // get titles and ids from the videos in the playlist
  // const videosData = await axios.get(
  //     `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
  //     { headers: { 'Accept': 'application/json' } }
  // );
  // const videos = [];
  // for (let i = 0; i < videosData.data.pageInfo.totalResults; i++) {
  //     videos[i] = new Video({
  //         title: videosData.data.items[i].snippet.title,
  //         videoId: videosData.data.items[i].snippet.resourceId.videoId
  //     });
  //     // await videos[i].save(); // save to the database
  // }

  const numberOfClasses = 0; // initializes number of classes to 0

  // create course dashboard from mongoose model
  const dashboard = new CourseDashboard({
    title,
    playlistId,
    numberOfClasses,
    author: req.user._id,
  });

  await dashboard.save(); // save to the database
  req.flash('success', 'Dashboard criado com sucesso!'); // success flash message
  res.redirect(`/courseDashboards/${dashboard._id}`);
};

// render edit dashboard page
module.exports.showCourseDashboard = async (req, res) => {
  const { id } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id).populate('author');
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${dashboard.playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );

  // check if some material is not on edisciplinas
  let nonMoodleMaterial = 0;
  if (!checkUrl.isMoodle(dashboard.classes)) {
    nonMoodleMaterial = 1;
  }
  res.render('courseDashboards/show', { dashboard, nonMoodleMaterial }); // render view
};

// update course dashboard
module.exports.updateCourseDashboard = async (req, res) => {
  const { id } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id); // find document in the database

  // set dashboard attributes
  dashboard.title = req.body.dashboard.title;
  dashboard.environmentUrl = req.body.dashboard.environmentUrl;
  dashboard.forumUrl = req.body.dashboard.forumUrl;

  await dashboard.save(); // save to the database
  req.flash('success', 'Dashboard salvo com sucesso!'); // send success message
  res.redirect(`/courseDashboards/${id}`); // redirect
};

// module.exports.showMaterial = async (req, res) => {
//     const { id } = req.params; // get information from request parameters
//     const dashboard = await CourseDashboard.findById(id); // find document in the database // find document in the database
// }

// delete course dashboard
module.exports.deleteCourseDashboard = async (req, res) => {
  const { id } = req.params; // get information from request parameters
  await CourseDashboard.deleteOne({ _id: id }); // delete document from the database
  req.flash('success', 'Dashboard deletado com sucesso!');
  res.redirect('/courseDashboards');
};

// render edit class form
module.exports.renderEditClassForm = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id); // find document in the database
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/editClass', { dashboard, videos, classNum }); // render view
};

// update class information
module.exports.updateClassInformation = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id); // find document in the database
  dashboard.classes[classNum] = { ...req.body.thisClass };
  await dashboard.save(); // save to the database
  req.flash('success', 'Aula salva com sucesso!');
  res.redirect(`/courseDashboards/${id}`);
};

// delete class
module.exports.deleteClass = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id); // find document in the database

  // remove class from the document
  dashboard.classes.splice(classNum, 1);
  for (let i = classNum; i < dashboard.classes.length; i++) {
    dashboard.classes[i].classNumber--;
  }

  await dashboard.save(); // save to the database

  req.flash('success', 'Aula deletada com sucesso!'); // send success message
  res.redirect(`/courseDashboards/${id}`); // redirect to another page
};

// render course dashboard
module.exports.renderCourseDashboard = async (req, res) => {
  const { id, classIndex } = req.params; // get information from request parameters
  const dashboard = await CourseDashboard.findById(id); // find document in the database

  // get necessary information to render the dashboard
  // preCE - pre-class essential
  // preCNE - pre-class non essential
  // forCE - for class essential
  // forCNE - for class non essential
  // postCE - post class essential
  // postCNE - post class non essential
  if (dashboard.classes.length > 0) {
    const preCEvideoId0 =
      dashboard.classes[classIndex].preClassMaterial.essential.video[0];
    const preCEvideoId1 =
      dashboard.classes[classIndex].preClassMaterial.essential.video[1];
    const preCEvideoId2 =
      dashboard.classes[classIndex].preClassMaterial.essential.video[2];

    const preCNEvideoId0 =
      dashboard.classes[classIndex].preClassMaterial.nonEssential.video[0];
    const preCNEvideoId1 =
      dashboard.classes[classIndex].preClassMaterial.nonEssential.video[1];
    const preCNEvideoId2 =
      dashboard.classes[classIndex].preClassMaterial.nonEssential.video[2];

    const forCEvideoId0 =
      dashboard.classes[classIndex].forClassMaterial.essential.video[0];
    const forCEvideoId1 =
      dashboard.classes[classIndex].forClassMaterial.essential.video[1];
    const forCEvideoId2 =
      dashboard.classes[classIndex].forClassMaterial.essential.video[2];

    const forCNEvideoId1 =
      dashboard.classes[classIndex].forClassMaterial.nonEssential.video[1];
    const forCNEvideoId2 =
      dashboard.classes[classIndex].forClassMaterial.nonEssential.video[2];
    const forCNEvideoId0 =
      dashboard.classes[classIndex].forClassMaterial.nonEssential.video[0];

    const postCEvideoId0 =
      dashboard.classes[classIndex].postClassMaterial.essential.video[0];
    const postCEvideoId1 =
      dashboard.classes[classIndex].postClassMaterial.essential.video[1];
    const postCEvideoId2 =
      dashboard.classes[classIndex].postClassMaterial.essential.video[2];

    const postCNEvideoId0 =
      dashboard.classes[classIndex].postClassMaterial.nonEssential.video[0];
    const postCNEvideoId1 =
      dashboard.classes[classIndex].postClassMaterial.nonEssential.video[1];
    const postCNEvideoId2 =
      dashboard.classes[classIndex].postClassMaterial.nonEssential.video[2];

    const videosIds = {
      preCEvideoId0,
      preCEvideoId1,
      preCEvideoId2,
      preCNEvideoId0,
      preCNEvideoId1,
      preCNEvideoId2,
      forCEvideoId0,
      forCEvideoId1,
      forCEvideoId2,
      forCNEvideoId0,
      forCNEvideoId1,
      forCNEvideoId2,
      postCEvideoId0,
      postCEvideoId1,
      postCEvideoId2,
      postCNEvideoId0,
      postCNEvideoId1,
      postCNEvideoId2,
    };

    // get chapters data (timestamps and chapters' titles) from the videos
    // preCE - pre-class essential
    // preCNE - pre-class non essential
    // forCE - for class essential
    // forCNE - for class non essential
    // postCE - post class essential
    // postCNE - post class non essential
    const preCEchaptersData0 = await chapters.getChaptersData(
      videosIds.preCEvideoId0
    );
    const preCEchaptersData1 = await chapters.getChaptersData(
      videosIds.preCEvideoId1
    );
    const preCEchaptersData2 = await chapters.getChaptersData(
      videosIds.preCEvideoId2
    );

    const preCNEchaptersData0 = await chapters.getChaptersData(
      videosIds.preCNEvideoId0
    );
    const preCNEchaptersData1 = await chapters.getChaptersData(
      videosIds.preCNEvideoId1
    );
    const preCNEchaptersData2 = await chapters.getChaptersData(
      videosIds.preCNEvideoId2
    );

    const forCEchaptersData0 = await chapters.getChaptersData(
      videosIds.forCEvideoId0
    );
    const forCEchaptersData1 = await chapters.getChaptersData(
      videosIds.forCEvideoId1
    );
    const forCEchaptersData2 = await chapters.getChaptersData(
      videosIds.forCEvideoId2
    );

    const forCNEchaptersData0 = await chapters.getChaptersData(
      videosIds.forCNEvideoId0
    );
    const forCNEchaptersData1 = await chapters.getChaptersData(
      videosIds.forCNEvideoId1
    );
    const forCNEchaptersData2 = await chapters.getChaptersData(
      videosIds.forCNEvideoId2
    );

    const postCEchaptersData0 = await chapters.getChaptersData(
      videosIds.postCEvideoId0
    );
    const postCEchaptersData1 = await chapters.getChaptersData(
      videosIds.postCEvideoId1
    );
    const postCEchaptersData2 = await chapters.getChaptersData(
      videosIds.postCEvideoId2
    );

    const postCNEchaptersData0 = await chapters.getChaptersData(
      videosIds.postCNEvideoId0
    );
    const postCNEchaptersData1 = await chapters.getChaptersData(
      videosIds.postCNEvideoId1
    );
    const postCNEchaptersData2 = await chapters.getChaptersData(
      videosIds.postCNEvideoId2
    );

    const chaptersData = {
      preCEchaptersData0,
      preCEchaptersData1,
      preCEchaptersData2,
      preCNEchaptersData0,
      preCNEchaptersData1,
      preCNEchaptersData2,
      forCEchaptersData0,
      forCEchaptersData1,
      forCEchaptersData2,
      forCNEchaptersData0,
      forCNEchaptersData1,
      forCNEchaptersData2,
      postCEchaptersData0,
      postCEchaptersData1,
      postCEchaptersData2,
      postCNEchaptersData0,
      postCNEchaptersData1,
      postCNEchaptersData2,
    };

    res.render('dashboards/courseDashboard', {
      dashboard,
      classIndex,
      chaptersData,
    }); // render view
  } else {
    res.render('dashboards/noClasses', { id }); // render view (there are no classes in the dashboard)
  }
};

module.exports.renderPreClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const title = 'Adicionar material pré-aula essencial';
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/preClassEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};

module.exports.renderPreClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/preClassNonEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};

module.exports.renderForClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/forClassEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};

module.exports.renderForClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const title = 'Adicionar material pré-aula essencial';
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/forClassNonEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};

module.exports.renderPostClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const title = 'Adicionar material pré-aula essencial';
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/postClassEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};

module.exports.renderPostClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const title = 'Adicionar material pré-aula essencial';
  const dashboard = await CourseDashboard.findById(id);
  const playlistId = dashboard.playlistId; // get youtube playlist id

  // get tiles and ids from the videos
  const videosData = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=99`,
    { headers: { Accept: 'application/json' } }
  );
  let videos = [];
  for (let video of videosData.data.items) {
    let title = video.snippet.title;
    let videoId = video.snippet.resourceId.videoId;
    videos.push({ title, videoId });
  }

  res.render('courseDashboards/postClassNonEssential', {
    dashboard,
    videos,
    id,
    classNum,
  });
};