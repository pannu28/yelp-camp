var mongoose=require('mongoose'),
    campground=require("./models/campground"),
    comment=require("./models/comment");
//    console.log(campground);
//    console.log(comment);
//  var campground=   campground.model("campground" );
const data=[
    {
        name: "Kheerganga",
        image: "fghj",
        description: "dfgh"
    },
    {
        name: "Tosh",
        image: "hj",
        description: "ghj"
    },
    {
        name: "Kasol",
        image: "gvhbj",
        description: "tghjk"
    }
]    

function seedDB(){
    //  campground.create({
    //     name: "Tosh",
    //     image: "hj",
    //     description: "ghj"  
    //  },(err,camp)=>{
    //         console.log(camp);
    //  });


     campground.deleteMany({},(err)=>{
           if(err){
               console.log(err);
           }
        //    else{
        //        console.log("");
        //    }
     data.forEach((seed)=>{
          campground.create(seed,(err,data)=>{
             if(err){
              console.log(err);
             }else{
                //  console.log(data);
                 comment.create({
                     text: "blas blah blas",
                     author: "pannu"
                 },(err,comment)=>{
                     if(err)
                     {
                       console.log(err);
                     }else{
                       data.comments.push(comment);
                       data.save();
                    // console.log(comment+"yo "+data.comments);
                     }
                 });
             }
          });
     });

  });
}

module.exports=seedDB;