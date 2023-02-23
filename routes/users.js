/**
 * @file users routes (specify what happens when server receives requests to /users/...)
 */

const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const {
  validateLogin,
  validateUser,
  isNotLoggedIn,
  renderError,
  validateForgotPwd,
  validateChangePwd,
  mongoSanitize,
} = require('../middleware');

router
  .route('/register')
  .get(isNotLoggedIn, users.renderRegister, renderError)
  .post(mongoSanitize, validateUser, wrapAsync(users.register), renderError);

router.route('/login').post(
  mongoSanitize,
  validateLogin,
  passport.authenticate('local', {
    failureMessage: true,
    failureFlash: true,
    failureRedirect: '/',
  }),
  users.login,
  renderError
);

router.route('/logout').get(users.logout, renderError);

router
  .route('/forgotPwd')
  .get(users.renderForgotPwd)
  .post(mongoSanitize, validateForgotPwd, users.sendPwdEmail);

router
  .route('/changePwd')
  .post(mongoSanitize, validateChangePwd, users.changePwd);

module.exports = router;