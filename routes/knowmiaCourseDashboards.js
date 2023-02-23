/**
 * @file knowmiaCourseDashboards routes (specify what happens when server receives requests to /knowmiaCourseDashboards/...)
 */

const express = require('express');
const router = express.Router();
const knowmiaCourseDashboards = require('../controllers/knowmiaCourseDashboards');
const {
  isKnowmiaCourseDashboardAuthor,
  isLoggedIn,
  validateEditKnowmiaClass,
  validateEditKnowmiaCourseDashboard,
  renderError,
  mongoSanitize,
} = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

router.route('/').get(wrapAsync(knowmiaCourseDashboards.index));

router
  .route('/new')
  .get(
    isLoggedIn,
    wrapAsync(knowmiaCourseDashboards.createKnowmiaCourseDashboard),
    renderError
  );

router
  .route('/:id')
  .get(
    isLoggedIn,
    wrapAsync(knowmiaCourseDashboards.showKnowmiaCourseDashboard),
    renderError
  )
  .put(
    mongoSanitize,
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    validateEditKnowmiaCourseDashboard,
    wrapAsync(knowmiaCourseDashboards.updateKnowmiaCourseDashboard),
    renderError
  )
  .delete(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.deleteKnowmiaCourseDashboard),
    renderError
  );

router
  .route('/:id/dash/:classIndex')
  .get(
    wrapAsync(knowmiaCourseDashboards.renderKnowmiaCourseDashboard),
    renderError
  );

router
  .route('/:id/classes/:classNum/preClassEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderPreClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/preClassNonEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderPreClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/forClassEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderForClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/forClassNonEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderForClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/postClassEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderPostClassEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum/postClassNonEssential')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderPostClassNonEssential),
    renderError
  );

router
  .route('/:id/classes/:classNum')
  .get(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.renderEditKnowmiaClassForm),
    renderError
  )
  .put(
    mongoSanitize,
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    validateEditKnowmiaClass,
    wrapAsync(knowmiaCourseDashboards.updateKnowmiaClassInformation),
    renderError
  )
  .delete(
    isLoggedIn,
    isKnowmiaCourseDashboardAuthor,
    wrapAsync(knowmiaCourseDashboards.deleteKnowmiaClass),
    renderError
  );

module.exports = router;
