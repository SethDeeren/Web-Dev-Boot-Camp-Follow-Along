const express = require('express');
const router = express.Router();
const passport =require('passport');
const User = require('../models/user');



router.get("/", (req,res)=>{
	res.render("landing");
});

// ===================================
// AUTH ROUTES
//===================================

router.get("/register", (req, res)=>{
	res.render("register");
});
//handle sign up logic
router.post("/register", (req, res)=>{
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}else{
			passport.authenticate("local")(req, res, ()=>{
				req.flash("success", "welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds");
			});
			
		}
	});
});

// show login route

router.get("/login", (req, res)=>{
	res.render("login");
});

// handling login logic

router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), (req,res)=>{
	res.send("login logic happens here");
});

// logic route

router.get("/logout", (req, res)=>{
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});



module.exports = router;