const express = require('express');
const router = express.Router();
const courseDashboards = require('../controllers/courseDashboards');
const {
    isCourseDashboardAuthor,
    isLoggedIn,
    validateNewCourseDashboard,
    validateEditCourseDashboard,
    validateEditClass,
    validateVideo,
    renderError,
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/')
    .get(wrapAsync(courseDashboards.index))
    .post(isLoggedIn, validateNewCourseDashboard, wrapAsync(courseDashboards.createCourseDashboard), renderError);

router.route('/new')
    .get(isLoggedIn, wrapAsync(courseDashboards.renderNewCourseDashboardForm), renderError);

router.route('/:id')
    .get(isLoggedIn, wrapAsync(courseDashboards.showCourseDashboard), renderError)
    .put(isLoggedIn, isCourseDashboardAuthor, validateEditCourseDashboard, wrapAsync(courseDashboards.updateCourseDashboard), renderError)
    .delete(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.deleteCourseDashboard), renderError);

// router.route('/:id/nedisciplinas').get(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.showMaterial), renderError);

router.route('/:id/dash/:classIndex')
    .get(wrapAsync(courseDashboards.renderCourseDashboard), renderError);

router.route('/:id/classes/:classNum')
    .get(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.renderEditClassForm), renderError)
    .put(isLoggedIn, isCourseDashboardAuthor, validateEditClass, wrapAsync(courseDashboards.updateClassInformation), renderError)
    .delete(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.deleteClass), renderError);

router.route('/:id/:classId')
    .get(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.renderEditClassForm), renderError)
    .put(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.updateClassInformation), renderError)
    .delete(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.deleteClass), renderError);

module.exports = router;