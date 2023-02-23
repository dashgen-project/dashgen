/**
 * @file Knowmia course dashboard controllers
 */

// models requires
const KnowmiaCourseDashboard = require('../models/knowmiaCourseDashboard');

const axios = require('axios'); // axios performs http requests
const checkUrl = require('../utils/checkUrl');

// show all course dashboards from an specifc user
module.exports.index = async (req, res) => {
  const dashboards = await KnowmiaCourseDashboard.find({
    author: req.user._id,
  }); // get course dashboard from the database
  res.render('knowmiaCourseDashboards', { dashboards }); // render view
};

// render new course dashboard form
module.exports.renderNewKnowmiaCourseDashboardForm = async (req, res) => {
  res.render('knowmiaCourseDashboards/new'); // render view
};

// get youtube playlist data via yt api, create dashboard and save to the database
module.exports.createKnowmiaCourseDashboard = async (req, res) => {
  // create course dashboard from mongoose model
  const dashboard = new KnowmiaCourseDashboard({
    title: 'Meu dashboard de curso com vídeos do Knowmia',
    numberOfClasses: 0,
    author: req.user._id,
  });
  await dashboard.save(); // save to the database
  req.flash('success', 'Dashboard criado com sucesso!'); // success flash message
  res.redirect(`/knowmiaCourseDashboards/${dashboard._id}`);
};

// render edit dashboard page
module.exports.showKnowmiaCourseDashboard = async (req, res, next) => {
  const { id } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id).populate(
    'author'
  );
  // check if some material is not on edisciplinas
  let nonMoodleMaterial = 0;
  if (!checkUrl.isMoodle(dashboard.classes)) {
    nonMoodleMaterial = 1;
  }
  res.render('knowmiaCourseDashboards/show', { dashboard, nonMoodleMaterial }); // render view
};

// update course dashboard
module.exports.updateKnowmiaCourseDashboard = async (req, res) => {
  const { id } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id); // find document in the database

  // set dashboard attributes
  dashboard.title = req.body.dashboard.title;
  dashboard.environmentUrl = req.body.dashboard.environmentUrl;
  dashboard.forumUrl = req.body.dashboard.forumUrl;

  await dashboard.save(); // save to the database
  req.flash('success', 'Dashboard salvo com sucesso!'); // send success message
  res.redirect(`/knowmiaCourseDashboards/${id}`); // redirect
};

// module.exports.showMaterial = async (req, res) => {
//     const { id } = req.params; // get information from request parameters
//     const dashboard = await CourseDashboard.findById(id); // find document in the database // find document in the database
// }

// delete course dashboard
module.exports.deleteKnowmiaCourseDashboard = async (req, res) => {
  const { id } = req.params; // get information from request parameters
  await KnowmiaCourseDashboard.deleteOne({ _id: id }); // delete document from the database
  req.flash('success', 'Dashboard deletado com sucesso!');
  res.redirect('/knowmiaCourseDashboards');
};

// render edit class form
module.exports.renderEditKnowmiaClassForm = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id); // find document in the database
  res.render('knowmiaCourseDashboards/editClass', { dashboard, classNum }); // render view
};

// update class information
module.exports.updateKnowmiaClassInformation = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id); // find document in the database
  dashboard.classes[classNum] = { ...req.body.thisClass };
  await dashboard.save(); // save to the database
  req.flash('success', 'Aula salva com sucesso!');
  res.redirect(`/knowmiaCourseDashboards/${id}`);
};

// delete class
module.exports.deleteKnowmiaClass = async (req, res) => {
  const { id, classNum } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id); // find document in the database

  // remove class from the document
  dashboard.classes.splice(classNum, 1);
  for (let i = classNum; i < dashboard.classes.length; i++) {
    dashboard.classes[i].classNumber--;
  }

  await dashboard.save(); // save to the database

  req.flash('success', 'Aula deletada com sucesso!'); // send success message
  res.redirect(`/knowmiaCourseDashboards/${id}`); // redirect to another page
};

// render course dashboard
module.exports.renderKnowmiaCourseDashboard = async (req, res) => {
  const { id, classIndex } = req.params; // get information from request parameters
  const dashboard = await KnowmiaCourseDashboard.findById(id); // find document in the database

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

    res.render('dashboards/knowmiaCourseDashboard', {
      dashboard,
      classIndex,
    }); // render view
  } else {
    res.render('dashboards/knowmiaNoClasses', { id }); // render view (there are no classes in the dashboard)
  }
};

module.exports.renderPreClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/preClassEssential', {
    dashboard,
    id,
    classNum,
  });
};

module.exports.renderPreClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/preClassNonEssential', {
    dashboard,
    id,
    classNum,
  });
};

module.exports.renderForClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/forClassEssential', {
    dashboard,
    id,
    classNum,
  });
};

module.exports.renderForClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/forClassNonEssential', {
    dashboard,
    id,
    classNum,
  });
};

module.exports.renderPostClassEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/postClassEssential', {
    dashboard,
    id,
    classNum,
  });
};

module.exports.renderPostClassNonEssential = async (req, res, next) => {
  const { id, classNum } = req.params;
  const dashboard = await KnowmiaCourseDashboard.findById(id);
  res.render('knowmiaCourseDashboards/postClassNonEssential', {
    dashboard,
    id,
    classNum,
  });
};
