/**
 * @file Main file, everything starts here
 */

// if not on production, load .env file variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose'); /** Interaction with the database */
const express = require('express'); /** Website routing */
const session = require('express-session'); /** Session middleware */
const helmet = require('helmet'); /** Security policy */
const path = require('path'); /** Works with files and directories paths*/
const methodOverride = require('method-override'); /** Allows PUT and DELETE methods */
const passport = require('passport'); /** Registration and user stuff */
const LocalStrategy = require('passport-local'); /** Strategy to perform registration and user-related actions */
const MongoStore = require('connect-mongo'); /** MongoDB session store for Connect and Express frameworks */
const flash = require('connect-flash'); /** Communicates things to the user via flash messages */
const cors = require('cors'); /** Middleware to enable CORS */
const mongoSanitize = require('express-mongo-sanitize');

/** Routes requires */
const howToUseRoutes = require('./routes/howToUse');
const courseDashboardRoutes = require('./routes/courseDashboards');
const knowmiaCourseDashboardRoutes = require('./routes/knowmiaCourseDashboards');
const playlistDashboardRoutes = require('./routes/playlistDashboards');
const videoDashboardRoutes = require('./routes/videoDashboards');
const userRoutes = require('./routes/users');

const wrapAsync = require('./utils/wrapAsync'); /** Handles errors on async functions */

/** Environment variables */
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/dashgen';
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const port = process.env.PORT || 3000;

const User = require('./models/user'); /** Mongoose user model */

/** Create session storage to save temporary data */
const store = MongoStore.create({
  mongoUrl: dbUrl /** Points to our Mongo database */,
  touchAfter: 24 * 60 * 60 /** Data will be stored for 24h */,
  crypto: {
    secret:
      secret /** Secret to encrypt session id according to OWASP recommendations*/,
  },
});

/**  Handle errors of session storage */
store.on('error', function (e) {
  console.log('session store error', e);
});

/** Session configurations */
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 3600 * 24 * 30 /** 30 days from now (in ms) */,
    maxAge: 1000 * 3600 * 24 * 30 /** 30 days in ms */,
  },
};

/** Allowed script sources */
/** TODO: check which ones are really necessary */
const scriptSrcUrls = [
  'https://stackpath.bootstrapcdn.com' /** Bootstrap */,
  'https://kit.fontawesome.com' /** Font Awesome */,
  'https://cdnjs.cloudflare.com' /** Cloudfare (js cloud delivery network) */,
  'https://cdn.jsdelivr.net' /** Jsdelivr (js cloud delivery network) */,
  'https://youtube.googleapis.com' /** YouTube API (get playlist and video data) */,
  'https://www.youtube.com' /** YouTube */,
  'https://www.googletagmanager.com' /** Google tag manager */,
  'https://app.knowmia.com',
  'https://cdn.cloud.techsmith.com'
];

/** Allowed style sources */
/** TODO: check which ones are really necessary */
const styleSrcUrls = [
  'https://kit-free.fontawesome.com' /** Font Awesome */,
  'https://stackpath.bootstrapcdn.com' /** Bootstrap */,
  'https://fonts.googleapis.com' /** Google fonts */,
  'https://use.fontawesome.com' /** Font Awesome */,
  'https://cdn.jsdelivr.net' /** Jsdelivr (js cloud delivery network) */,
];

/** Allowed server connection sources */
/** TODO: check which ones are really necessary */
const connectSrcUrls = [
  'https://youtube.googleapis.com',
  'https://www.youtube.com',
  'https://www.google-analytics.com',
  'https://app.knowmia.com',
  'https://cdn.cloud.techsmith.com'
];

/** Allowed frame sources */
const frameSrcUrls = [
  'https://www.youtube.com',
  'https://youtu.be',
  'https://app.knowmia.com',
  'https://login.techsmith.com',
  'https://cdn.cloud.techsmith.com',
  'https://giphy.com'
];

/** Allowed font sources */
/** TODO: check if is necessary */
const fontSrcUrls = ['https://cdn.jsdelivr.net'];

const app = express(); /** Express application creation */

/** Set view engine to EJS and views directory */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** Mounts middlewares that will be executed for every requiest */
app
  .use(
    express.static(path.join(__dirname, 'public'))
  ) /** Allows access to the "public/" directory from inside .ejs files */
  .use(
    express.urlencoded({ extended: true })
  ) /** Parse urlencoded bodies with qs (https://www.npmjs.com/package/qs) library */
  .use(
    methodOverride('_method')
  ) /** Use "_method=[PUT|DELETE]" in action attribute of the form tag */
  .use(cors()) /** Allows cors */
  .use(
    mongoSanitize({
      replaceWith: '_',
    })
  )
  .use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", 'blob:'],
        childSrc: ['blob:'],
        objectSrc: [],
        imgSrc: ["'self'", 'blob:', 'data:'],
        fontSrc: ["'self'", ...fontSrcUrls],
        frameSrc: ["'self'", 'blob:', ...frameSrcUrls],
        frameAncestors: ['https://edisciplinas.usp.br/'],
      },
    })
  ) /** Set Content-Security-Policy header to mitigate xss */
  .use(session(sessionConfig)) /** Mount session middleware */
  .use(flash()) /** Mount flash middleware */
  .use(passport.initialize()) /** Mount passport initialize middleware */
  .use(passport.session()); /** Mount passport session middleware */

passport.use(
  new LocalStrategy(User.authenticate())
); /** Set authentication and authorization strategy */
passport.serializeUser(
  User.serializeUser()
); /** Store user data to the session */
passport.deserializeUser(
  User.deserializeUser()
); /** Get user data from the session */

/** Mount middleware to save user id and configure flash messages (https://www.npmjs.com/package/connect-flash) */
app.use((req, res, next) => {
  res.locals.currentUser = req.user; /** Save user id to local variables */

  /** Necessary to send success/error flash messages to the user */
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

/** Mount middleware at base path (/) */
app.get(
  '/',
  wrapAsync(async (req, res, next) => {
    /** If user is not authenticated, render login page, otherwise, render home page */
    if (!req.isAuthenticated()) {
      return res.render('users/login');
    }
    res.render('home');
  })
);

/** Mount middleware for all paths */
app.use('/', userRoutes);
app.use('/howToUse', howToUseRoutes);
app.use('/courseDashboards', courseDashboardRoutes);
app.use('/knowmiaCourseDashboards', knowmiaCourseDashboardRoutes);
app.use('/playlistDashboards', playlistDashboardRoutes);
app.use('/videoDashboards', videoDashboardRoutes);

/** Main function */
async function main() {
  await mongoose.connect(dbUrl); /** Connect to Mongo database */
  /** Creates server listener at specified port */
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

/** Try to call main and if there are any errors, log it to the console */
main().catch((err) => console.log(err));
