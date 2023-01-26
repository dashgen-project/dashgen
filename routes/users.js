const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { validateLogin, validateUser, isNotLoggedIn, renderError } = require('../middleware');

router.route('/register')
    .get(isNotLoggedIn, users.renderRegister, renderError)
    .post(validateUser, wrapAsync(users.register), renderError);

router.route('/login')
    .post(
        validateLogin,
        passport.authenticate('local', {
            failureMessage: true,
            failureFlash: true,
            failureRedirect: '/',
        }),
        users.login,
        renderError
    );

router.route('/logout')
    .get(users.logout, renderError);

router.route('/forgotPwd')
    .get(users.renderForgotPwd)
    .post(users.sendPwdEmail);

router.route('/changePwd').post(users.changePwd);

module.exports = router;