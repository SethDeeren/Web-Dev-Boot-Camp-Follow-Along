// all the midlleware goes here
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');


const middlewareObj = {

	checkCampgroundOwnership: (req, res, next)=>{
		// is user logged in?
			console.log("==============>>>>>>>>>>>>>>>>>>>>>>>>>>>> req is ", req)
			if(req.isAuthenticated()){

				Campground.findById(req.params.id, (err,foundCampground)=>{
					if(err){
						req.flash("error", "Campground not found. sorry");
						res.redirect('back');
					}else{
						//does user own campground
						if(foundCampground.author.id.equals(req.user._id)){
							next();
						}else{
							req.flash("error", "access denied, you don't have permission to do that.")
							res.redirect("back");
						}

					}
				});
			}else{
				req.flash("error", "You need to be logged in to do that.")
				res.redirect("back");
			}
	},

	checkCommentOwnership: (req, res, next)=>{
		// is user logged in?
			if(req.isAuthenticated()){

				Comment.findById(req.params.comment_id, (err,foundComment)=>{
					if(err){
						res.redirect('back');
					}else{
						//does user own comment
						if(foundComment.author.id.equals(req.user._id)){
							next();
						}else{
							res.redirect("back");
						}

					}
				});
			}else{
				req.flash("error", "You need to be logged in to do that");
				res.redirect("back");
			}
	},

	isLoggedIn: (req, res, next)=>{
		if(req.isAuthenticated()){
			return next();
		}else {
			req.flash("error", "You need to be logged in to do that");
			res.redirect("/login");
		}
	}
}

module.exports = middlewareObj;