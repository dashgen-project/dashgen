/**
 * @file courseDashboards routes (specify what happens when server receives requests to /courseDashboards/...)
 */

const express = require('express');
const router = express.Router();
const courseDashboards = require('../controllers/courseDashboards');
const {
  isCourseDashboardAuthor,
  isLoggedIn,
  validateNewCourseDashboard,
  validateEditCourseDashboard,
  validateEditClass,
  renderError,
  mongoSanitize,
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router
  .route('/')
  .get(wrapAsync(courseDashboards.index))
  .post(
    mongoSanitize,
    isLoggedIn,
    validateNewCourseDashboard,
    wrapAsync(courseDashboards.createCourseDashboard),
    renderError
  );

router
  .route('/new')
  .get(
    isLoggedIn,
    wrapAsync(courseDashboards.renderNewCourseDashboardForm),
    renderError
  );

router
  .route('/:id')
  .get(isLoggedIn, wrapAsync(courseDashboards.showCourseDashboard), renderError)
  .put(
    mongoSanitize,
    isLoggedIn,
    isCourseDashboardAuthor,
    validateEditCourseDashboard,
    wrapAsync(courseDashboards.updateCourseDashboard),
    renderError
  )
  .delete(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.deleteCourseDashboard),
    renderError
  );

router
  .route('/:id/dash/:classIndex')
  .get(wrapAsync(courseDashboards.renderCourseDashboard), renderError);

router
  .route('/:id/classes/:classNum/preClassEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderPreClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/preClassNonEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderPreClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/forClassEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderForClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/forClassNonEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderForClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/postClassEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderPostClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/postClassNonEssential')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderPostClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum')
  .get(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.renderEditClassForm),
    renderError
  )
  .put(
    mongoSanitize,
    isLoggedIn,
    isCourseDashboardAuthor,
    validateEditClass,
    wrapAsync(courseDashboards.updateClassInformation),
    renderError
  )
  .delete(
    isLoggedIn,
    isCourseDashboardAuthor,
    wrapAsync(courseDashboards.deleteClass),
    renderError
  );



// router.route('/:id/:classId')
//     .get(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.renderEditClassForm), renderError)
//     .put(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.updateClassInformation), renderError)
//     .delete(isLoggedIn, isCourseDashboardAuthor, wrapAsync(courseDashboards.deleteClass), renderError);

module.exports = router;