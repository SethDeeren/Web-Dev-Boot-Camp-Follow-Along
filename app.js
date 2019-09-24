const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require ('passport-local');
const methodOverride = require('method-override');
const Campground = require('./models/campgrounds');
const Comment	= require('./models/comment');
const User = require('./models/user');
const seedDB = require('./seeds');

const commentRoutes		= require('./routes/comments'),
	  campgroundRoutes	= require('./routes/campgrounds'),
	  authRoutes		= require('./routes/index');



// Database connection
//mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://sdeeren:12twelveXII@cluster0-s7l5v.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=>{
	console.log('connected to db')
}).catch(err => {
	console.log('ERROR', err.message);
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seeding the data base
//seedDB();


// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret:"This is a secret phrase can be any thing",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
	//every route will have current user in it and in the ejs templates
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT || 3000, ()=>{
	console.log("yelp camp app is being served");
});