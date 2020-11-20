const express=require('express');
const router=express.Router({mergeParams:true});
var campground=require('../models/campground');
var comment=require('../models/comment');
var middleware=require("../middleware");

router.get("/",(req,res)=>{
      
    campground.find({},(err,campgrounds)=>{
        if(err){
        console.log(err);}
        else{
          res.render("campgrounds/index",{camps: campgrounds});}
    });
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    const name=req.body.name;
    const image=req.body.image;
    const desc=req.body.description;
    const price=req.body.price;
    var author={
       id: req.user._id,
       username: req.user.username
    }
     const newCamp={name: name ,image: image,description: desc,author:author,price: price}; 
     console.log(req.user);
     campground.create(newCamp,(err,newCamp)=>{
        if(err){
        console.log(err);}
        else{
          res.redirect("campgrounds");
        }  
     });
     
});

router.get("/new",middleware.isLoggedIn,(req,res)=>{
        res.render("campgrounds/new");
});

router.get("/:id",(req,res)=>{
campground.findById(req.params.id).populate("comments").exec((err,foundcampground)=>{
      if(err)
      { res.send("errorrrr!!! No such campground with given id "+req.params.id);
        console.log(err);}
      else{
        // console.log(foundcampground);
        res.render("campgrounds/show",{campground: foundcampground});
      }
});          
});

// edit
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
   
    campground.findById(req.params.id,(err,foundCampground)=>{
          // if(err){
          //   res.redirect("/campgrounds");  
          // }else{
            res.render("campgrounds/edit",{campground: foundCampground});
          // }
    });
});

// update
router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
  // console.log("hj");  
  campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updateCampground)=>{
      if(err){
         res.redirect("/campgrounds");
      }else{
         res.redirect("/campgrounds/"+req.params.id);
      }
    });
});

// destroy
router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
  console.log("asd");  
  campground.findByIdAndRemove(req.params.id,(err)=>{
    if(err){
    console.log(err);}
    else{
    req.flash("success","campground deleted!!");  
    res.redirect("/campgrounds");}
    });
});



module.exports=router;