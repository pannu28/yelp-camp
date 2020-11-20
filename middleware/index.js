var middleware={};
var campground=require("../models/campground");
var comment=require("../models/comment");

middleware.checkCampgroundOwnership    = (req,res,next)=>{
  // console.log("jk"); 
  if(req.isAuthenticated()){
      campground.findById(req.params.id,(err,foundCampground)=>{
         if(err){
          req.flash("error","campground not found!!")
           res.redirect("back");
         }else{
           if(foundCampground.author.id.equals(req.user._id)){
             next();
             // res.render("campgrounds/edit",{campground: foundCampground});
           }else{
            req.flash("error","you don't have permission to do that!!")
              res.redirect("back");
           }
         }
      });
    }
    else{
      req.flash("error","you need to be logged in to do that!!")
      res.redirect("back");
    } 
 } 
 
 middleware.checkCommentOwnership= (req,res,next)=>{
    if(req.isAuthenticated()){
      comment.findById(req.params.comment_id,(err,foundComment)=>{
         if(err){
           req.flash("error","comment not found!!")
           res.redirect("back");
         }else{
           if(foundComment.author.id.equals(req.user._id)){
             next();
             // res.render("campgrounds/edit",{campground: foundCampground});
           }else{
            req.flash("error","you don't have permission to do that!!")
              res.redirect("back");
           }
         }
      });
    }
    else{
      req.flash("error","you need to be logged in to do that!!");
      res.redirect("back");
    } 
  } 
  
middleware.isLoggedIn= (req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error","login please");
    res.redirect('/login');
}

module.exports=middleware;