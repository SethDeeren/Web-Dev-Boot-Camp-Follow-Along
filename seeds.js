const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

let data = [
	{
	 name: "Clouds Rest", 
	 image: "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
	 description: "Bacon ipsum dolor amet strip steak rump short ribs venison pork chop. Beef ribs short loin pork belly tri-tip flank. Pancetta fatback flank, chuck turducken turkey tail picanha drumstick hamburger. Filet mignon hamburger pork chop landjaeger biltong flank pork loin. Pork chop short ribs tenderloin, buffalo spare ribs t-bone meatball ground round pork loin. Buffalo bacon ham hock burgdoggen swine pig sausage brisket prosciutto ball tip pork chop beef beef ribs cow pastrami."
	},
	{
	 	name:"Desert Mesa",
		image:"https://cincinnatiusa.com/sites/default/files/styles/article_full/public/attractionphotos/Winton%20Woods%20Campground.JPG?itok=xqTUl4YJ",
		description: "Bacon ipsum dolor amet strip steak rump short ribs venison pork chop. Beef ribs short loin pork belly tri-tip flank. Pancetta fatback flank, chuck turducken turkey tail picanha drumstick hamburger. Filet mignon hamburger pork chop landjaeger biltong flank pork loin. Pork chop short ribs tenderloin, buffalo spare ribs t-bone meatball ground round pork loin. Buffalo bacon ham hock burgdoggen swine pig sausage brisket prosciutto ball tip pork chop beef beef ribs cow pastrami."
	},
	{
	 	name:"Canyon Floor",
		image:"https://static.rootsrated.com/image/upload/s--_i1nqUT1--/t_rr_large_traditional/oy9xsbijv8wehnrzv0zt.jpg",
		description: "Bacon ipsum dolor amet strip steak rump short ribs venison pork chop. Beef ribs short loin pork belly tri-tip flank. Pancetta fatback flank, chuck turducken turkey tail picanha drumstick hamburger. Filet mignon hamburger pork chop landjaeger biltong flank pork loin. Pork chop short ribs tenderloin, buffalo spare ribs t-bone meatball ground round pork loin. Buffalo bacon ham hock burgdoggen swine pig sausage brisket prosciutto ball tip pork chop beef beef ribs cow pastrami."
	}
	
	
]


function seedDB(){
	// remove all campgrounds
	Campground.remove({}, (err)=>{
		if(err){
			console.log(err);
		}else{
			console.log("campgrounds removed");
		}
	});
	//add a few campgrounds
	data.forEach((seed)=>{
		Campground.create(seed, (err, campground)=>{
			if(err){
				console.log("err in for loop");
				console.log(err);
			}else{
				console.log("added a campground");
				Comment.create(
				{
					text: "This place is great, but I wish there was internet",
					author: "Homer"
				}, function(err, comment){
					if(err){
						console.log(err);
					} else {
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");
					}
				});
			}
		})
	});
	
	
}

module.exports = seedDB;
