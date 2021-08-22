const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('../db/conn.js')
const User = require('../model/userSchema')

router.get('/',(req, res)=>{
    
    res.send('hello world from the server router js')
});
// using promise
// router.post('/register',(req, res)=>{

//     const { name,email,phone,work,password,cpassword}=req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"plz fill the field "})
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist) {
//             return res.status(422).json({error:"email already exist"});
//         }
//         const user = new User({name , email , phone, work ,password ,cpassword})

//         user.save().then(()=>{
//             res.status(201).json({message:"user registration successfully"})
//         }).catch((err) =>
//             res.status(500).json({error:"failed to registration"}));

//     }).catch(err => { console.log(err);});

//Async - await

router.post('/register', async (req, res)=>{

    const { name,email,phone,work,password,cpassword}=req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"plz fill the field "})
    }
    try{
      const userExist = await User.findOne({email:email})
    
      if(userExist){
          return res.status(422).json({error:"email already exist"})
      } else if(password != cpassword){
        return res.status(422).json({error:"password are not matching"})
      }else{
        const user = new User ({name,email,phone,work,password,cpassword})
        await user.save()
        
          res.status(201).json({message:"user registration successfully"})
      }
      
    } catch (err){
        console.log(err);
    }
   
});

//login route
router.post('/signin', async (req,res)=>{
    
    try{
        const { email,password }=req.body;
        console.log(req.body)

        if( !email || !password ){
        return res.status(400).json({error:" please fill the data "})
        }
        const userLogin = await User.findOne({email:email})
        console.log(userLogin)
        

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken()
            console.log(token)
            if(!isMatch){
                res.status(400).json({error:"Invalid credential"})
            }else{
                res.json({message:"user login successfully"})
            }
        }else{
            res.status(400).json({error:"invalid crediential"})
        }
        

    }catch(err){
        console.log(err)
    }
});

module.exports = router;