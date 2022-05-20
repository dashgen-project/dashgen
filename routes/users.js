const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { validateLogin, validateUser, isNotLoggedIn } = require('../middleware');

router.route('/register')
    .get(isNotLoggedIn, wrapAsync(users.renderRegister))
    .post(validateUser, wrapAsync(users.register));

router.route('/login')
    .post(
        validateLogin,
        passport.authenticate('local', {
            failureMessage: true,
            failureFlash: true,
            failureRedirect: '/',
        }),
        wrapAsync(users.login)
    );

router.get('/logout', wrapAsync(users.logout));

module.exports = router;