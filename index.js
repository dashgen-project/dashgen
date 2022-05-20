if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const courseDashboardRoutes = require('./routes/courseDashboards');
const playlistDashboardRoutes = require('./routes/playlistDashboards');
const videoDashboardRoutes = require('./routes/videoDashboards');
const userRoutes = require('./routes/users');
const wrapAsync = require('./utils/wrapAsync');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/dashgen';
const secret = process.env.SECRET || 'thisshouldbeabettersecret';
const User = require('./models/user');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

store.on('error', function (e) {
    console.log('session store error', e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 3600 * 24 * 7,
        maxAge: 1000 * 3600 * 24 * 7
    }
}

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
    "https://youtube.googleapis.com",
    "https://www.youtube.com"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
    "https://cdn.jsdelivr.net"
];
const connectSrcUrls = [
    "https://youtube.googleapis.com",
    "https://www.youtube.com"
];
const frameSrcUrls = [
    "https://www.youtube.com"
];
const fontSrcUrls = [];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            frameSrc: ["'self'", "blob:", ...frameSrcUrls]
        },
    })
);

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', wrapAsync(async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.render('users/login');
    }
    res.render('home');
}));

app.use('/', userRoutes)
app.use('/courseDashboards', courseDashboardRoutes);
app.use('/playlistDashboards', playlistDashboardRoutes);
app.use('/videoDashboards', videoDashboardRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
