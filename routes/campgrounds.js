const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');
const middleware = require('../middleware/index');

router.get("/campgrounds", (req,res)=>{
	Campground.find({}, (err, allCampgrounds)=>{
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
	//res.render("campgrounds",{campgrounds: campgrounds})
});

router.post("/campgrounds",middleware.isLoggedIn, (req,res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {name: name, price: price, image: image, description: desc, author:author};
	console.log(req.user);
	Campground.create(newCampground, (err, newlyCreated)=>{
		if(err){
			console.log(err);
		} else {
			// redirect back to camp ground page
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
	
	
	
	
});

router.get("/campgrounds/new",middleware.isLoggedIn, (req,res) => {
	res.render("campgrounds/new");
});
// SHOW ROUTE

router.get("/campgrounds/:id", (req,res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
		if(err){
			console.log("oh no somthing went wrong I am in the show route for a campground");
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
		
	});
	
	
});

//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
	
	Campground.findById(req.params.id, (err,foundCampground)=>{
		res.render('campgrounds/edit', {campground: foundCampground});
	});	
});

// UPDATE CAMPGROUND ROUTE

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, (req, res)=>{
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
	
});

// DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;