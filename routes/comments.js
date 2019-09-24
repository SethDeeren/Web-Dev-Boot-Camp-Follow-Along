const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');
const middleware = require('../middleware/index');

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req,res)=>{
	
	console.log(req.params.id);
	
	Campground.findById(req.params.id, (err, foundCampground)=>{
		console.log(req.params.id);
		if(err){
			console.log(err);
		} else {
			console.log("going to post route" + foundCampground + "===================================================================================");
			res.render("comments/new",{campground: foundCampground});
		}
	});
});
// Comments create route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res)=>{
	// look up campground using id
	console.log("made it");
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			req.flash("error", "somthing went wrong");
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				}else{
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					console.log("new comment username is: " + req.user.username);
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});

});
// EDIT ROUTE
router.get("/campgrounds/:id/comments/:coment_id/edit", (req, res)=>{
	Comment.findById(req.params.coment_id, (err, foundComment)=>{
		if(err){
			res.redirect('back');
		}else{
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment });
		}
	});
	 
});

//UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
	
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
		if(err){
			res.redirect('back');
		} else {
			console.log(updatedComment);
			console.log("This is the req.params.id ==========================================" + req.params.id);
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
	
});

// COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			console.log(err);
			res.redirect('back');
		}else{
			req.flash("success", "Comment deleted.");
			res.redirect("/campgrounds/" + req.params.id);
		}
		
	})
	
});



module.exports = router;