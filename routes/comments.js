const express=require('express');
const router=express.Router({mergeParams: true});
var campground=require('../models/campground');
var comment=require('../models/comment');
var middleware=require("../middleware/index");


router.get("/new",middleware.isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,campground)=>{
            if(err){
              console.log(err);
            }else{
              res.render('comments/new',{campground: campground});
            }
    });
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
      campground.findById(req.params.id,(err,campground)=>{
         if(err){
           console.log(err);
         }else{
           comment.create(req.body.comment,(err,comment)=>{
               if(err){
                 console.log(err);
               }else{
                //  console.log(req.user);
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                
                comment.save();

                 campground.comments.push(comment);
                 campground.save();
                 req.flash("success","Successfully added comment!!")
                 res.redirect('/campgrounds/'+campground._id)
               }
           });
         }
      });
});

// edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    comment.findById(req.params.comment_id,(err,foundComment)=>{
       if(err){
         res.redirect("back");
       }else{
         res.render("comments/edit",{campground_id: req.params.id, comment:foundComment});
       }
    });
});

// update
router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,foundComment)=>{
      if(err){
        // console.log("op");
        res.redirect("back");
      }else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    });
});

//destroy
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    comment.findByIdAndRemove(req.params.comment_id,(err)=>{
       if(err){
        //  console.log("op");
         res.redirect("back");
       }else{
         req.flash("success","comment deleted!!");
         res.redirect("/campgrounds/"+req.params.id);
       }
    });
}); 

 

module.exports=router;