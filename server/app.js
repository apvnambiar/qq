const dotenv = require("dotenv")
const express = require('express')
const app = express()

dotenv.config({path:'./config.env'});
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;


//middleWare
const middleware =(req,res,next)=>{
    console.log('hello miidleWare')
    next()
}


app.get('/',(req,res)=>{
    res.send('hello world this is home page')
    
});

app.get('/about', middleware, (req,res)=>{
    console.log('middleprofile')
    res.send('hello world this is about page from server')
   
});
app.get('/notification',(req,res)=>{
    res.send('hello world this is notification page')
});
app.get('/settings',(req,res)=>{
    res.send('hello world this is settings page')
});
app.get('/create',(req,res)=>{
    res.send('hello world this is create page')
});
app.get('/login',(req,res)=>{
    res.send('hello world this is login page')
});
app.get('/signup',(req,res)=>{
    res.send('hello world this is signup page')
});

app.listen(PORT,()=>{
    console.log(`server ${PORT} running`)
});