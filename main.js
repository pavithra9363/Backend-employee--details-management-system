const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
  

// const connect=mongoose.connect('mongodb://localhost:27017/newEmployee')
// .then(console.log("mongodb connect successfull"))
// .catch((err) => console.error("MongoDB connection error:", err));


require('dotenv').config();
const PORT=process.env.PORT || 8020;


const mongoURL=process.env.MONGODB_URL;

async function run(){
    await mongoose.connect(mongoURL);

     console.log("connect")

}
run();

app.set('view engine','ejs');
app.use(express.static('public'));

const routers=require('./routes/routes.js');
app.use('/new',routers)

app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(PORT,'0.0.0.0',()=>console.log("server connected successfully"))




