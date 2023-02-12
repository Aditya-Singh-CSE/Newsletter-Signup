// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//To send css and image file use this method of express
app.use(express.static("public"));

//To send HTML files to client side
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

 //The data we want to send
  var data = {
    members:[
      {
        email_address: email,
        status : "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  // To convert data in JSON format
  var jsonData = JSON.stringify(data);

  var options={
    url: "https://us9.api.mailchimp.com/3.0/lists/03392a10b1",
    method:"POST",
    headers:{
      "Authorization": "aditya f239e5327f73557ba33659d67686e7c6-us9"
    },
    body: jsonData
  };

  request(options,function(error,response,body){
    if(error){
      console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }
    else{
      if(response.statusCode===200){
        console.log(response.statusCode);
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(req,res){
  console.log("Server is running on port 3000.");
});
// api key
 // f239e5327f73557ba33659d67686e7c6-us9
 // list id
 // 03392a10b1 unique id for list
