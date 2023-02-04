/**
 * @file howToUse routes (specify what happens when server receives requests to /hoeToUse/...)
 */

const express = require('express');
const router = express.Router();
const howToUse = require('../controllers/howToUse');
const wrapAsync = require('../utils/wrapAsync');

router.route('/').get(howToUse.renderHowToUse);

module.exports = router;