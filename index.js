/**
 * @file Main file, everything starts here
 */

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
const bodyParser = require('body-parser');

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
    expires: Date.now() + 1000 * 3600 * 24 * 7 /** 7 days from now (in ms) */,
    maxAge: 1000 * 3600 * 24 * 7 /** 7 days in ms */,
  },
};

/** Allowed script sources */
const scriptSrcUrls = [
  'https://stackpath.bootstrapcdn.com' /** Bootstrap */,
  'https://kit.fontawesome.com' /** Font Awesome */,
  'https://cdnjs.cloudflare.com' /** Cloudfare (js cloud delivery network) */,
  'https://cdn.jsdelivr.net' /** Jsdelivr (js cloud delivery network) */,
  'https://youtube.googleapis.com' /** YouTube API (get playlist and video data) */,
  'https://www.youtube.com' /** YouTube */,
];

/** Allowed style sources */
const styleSrcUrls = [
  'https://kit-free.fontawesome.com' /** Font Awesome */,
  'https://stackpath.bootstrapcdn.com' /** Bootstrap */,
  'https://fonts.googleapis.com' /** Google fonts */,
  'https://use.fontawesome.com' /** Font Awesome */,
  'https://cdn.jsdelivr.net' /** Jsdelivr (js cloud delivery network) */,
];

/** Allowed server connection sources*/
const connectSrcUrls = [
  'https://youtube.googleapis.com',
  'https://www.youtube.com',
];

const frameSrcUrls = [
  'https://www.youtube.com',
  'https://youtu.be',
  'https://app.knowmia.com/',
];

/** Allowed font sources (none) */
const fontSrcUrls = [];

const frameAncestors = ['https://edisciplinas.usp.br/'];

const app = express(); /** Express application creation */

/** Set view engine to EJS and views directory */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/** Mounts middlewares that will be executed for every requiest */
app.use(
  express.static(path.join(__dirname, 'public'))
); /** Allows access to the "public/" directory */
app.use(
  express.urlencoded({ extended: true })
); /** Parse only urlencoded bodies with qs library */
app.use(
  methodOverride('_method')
); /** Use "_method=[PUT|DELETE]" in action attribute of the form tag */
app.use(cors()); /** Allows cors */

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(mongoSanitize());
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

/** Set Content-Security-Policy header to mitigate xss */
/** In practice, it sets a "Content-Security-Policy" HTTP header telling the browser where to accept content from */
app.use(
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
);
app.use(session(sessionConfig)); /** Mount session middleware */
app.use(flash()); /** Mount flash middleware */
app.use(passport.initialize()); /** Mount passport initialize middleware */
app.use(passport.session()); /** Mount passport session middleware */

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
}

/** Creates server listener at specified port */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/** Try to call main and if there are any errors, log it to the console */
main().catch((err) => console.log(err));
