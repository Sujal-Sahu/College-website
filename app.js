const express=require('express');
const app=express();
const path =require('path');
const port=3002;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config(); 

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are successfully connected.");
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    age: String,
    subject: String,
    message: String
  });

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    comment: String
  });

  const message = mongoose.model('message', messageSchema);
  const comment = mongoose.model('comment', commentSchema);

// app.use('/',(req,res,next)=>{
//     console.log(req.url);
//     next();
// })

app.use(express.static(path.join(__dirname,"static")));

// app.use("/",(req,res,next)=>{
//     console.log(req.url);
//     next();
// })

app.get('/',(req,res)=>{
    // console.log(req.url);
    res
    .status(200)
    .sendFile(path.join(__dirname,"static","index.html"));
})
app.get('/about',(req,res)=>{
    // console.log(req.url);
    res
    .status(200)
    .sendFile(path.join(__dirname,"static","about.html"));
})
app.get('/courses',(req,res)=>{
    // console.log(req.url);
    res
    .status(200)
    .sendFile(path.join(__dirname,"static","courses.html"));
})
app.get('/blog',(req,res)=>{
    // console.log(req.url);
    res
    .status(200)
    .sendFile(path.join(__dirname,"static","blog.html"));
})
app.get('/contact',(req,res)=>{
    // console.log(req.url);
    res
    .status(200)
    .sendFile(path.join(__dirname,"static","contact.html"));
})

// app.use(express.urlencoded());

// app.post('/contact',(req,res)=>{
//     let a=req.body;
//     console.log(a);
//     res.send("your information has been successfully submitted");
// })

app.use(express.urlencoded());
app.post("/contact",(req,res)=>{
    const data=new message(req.body);
    data.save().then(()=>{
        res.send('your information has been submitted successfully. thanks for registering.')
    }).catch(()=>{
        res.status(404).send('ERROR OCURRED')
    })
    // res.render('contact',{title:'hey sujal',content:'this is tutorial for doing some get work for pubg.'})
})

app.post("/blog",(req,res)=>{
    const information=new comment(req.body);
    information.save().then(()=>{
        res.send('your information has been submitted successfully. thanks for registering.')
    }).catch(()=>{
        res.status(404).send('ERROR OCURRED')
    })
    // res.render('contact',{title:'hey sujal',content:'this is tutorial for doing some get work for pubg.'})
})

app.listen(port,(req,res)=>{
     console.log(`the server is starting at ${port}`);
})