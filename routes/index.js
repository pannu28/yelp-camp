const express=require('express');
const router=express.Router();
var passport=require('passport');
var User=require('../models/user');


   router.get("/",(req,res)=>{
    //    res.send("Welcome to Yelp Camp!!");
          res.render("landing");
    });
     
    // auth routes
    
    router.get('/register',(req,res)=>{
        res.render('register');
    });
    
    router.post('/register',(req,res)=>{
      var newUser=new User({username: req.body.username});
       User.register(newUser,req.body.password,(err,user)=>{
               if(err){
                //  console.log(err);
                req.flash("error",err.message);
                 return res.redirect('register');
               }
             passport.authenticate('local')(req,res,()=>{
               req.flash("success","Welcome to YelpCamp !! "+user.username);
                res.redirect('campgrounds');
             });
       });
    });
    
    router.get('/login',(req,res)=>{
       res.render('login');
    });
    
    router.post('/login',passport.authenticate('local',{
        successRedirect: 'campgrounds',
        failureRedirect: 'login'
    }),(req,res)=>{
         
    });
    
    router.get('/logout',(req,res)=>{
        req.logOut();
        req.flash("success","Logged you Out!!");
        res.redirect('campgrounds');
    });
    
    
    

    module.exports=router;