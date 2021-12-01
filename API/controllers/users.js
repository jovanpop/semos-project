const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv').config();

module.exports={
    postUser: async(req,res)=>{
        try {
            req.body.email= req.body.email.toLowerCase();
            let user = await User.findOne({email:req.body.email})
            if (user){
                throw new Error('This email is already taken !')
            }
            if(req.body.confirmPW === req.body.password){
                req.body.password=bcrypt.hashSync(req.body.password)
                user=await User.create(req.body)
            }
            else{
                throw new Error("Passwords don't match")
            }
            res.send({
                err: false,
                message: "New user created",
                user: user
            });
        }
        catch (err){
            res.send({
                err:true,
                message: err.message
            });
        }
    },
    postLogin: async(req,res)=>{
        try{
            user=await User.findOne({email:req.body.email});
            if(!user){
                throw new Error('Invalid credentials');
            }
            if(!bcrypt.compareSync(req.body.password,user.password)){
                throw new Error('Invalid credentials');
            }
            const payload={
                id: user._id,
                email: user.email,
                first_name: user.first_name
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: "7d"
            });
            res.send({
                err:false,
                message:"User logged in ",
                token:token,
            });
        }
        catch(err){
            res.send({
                err:true,
                message:err.message
            });
        }
    },
    getUser: async(req,res)=>{
        try{
            user=await User.findById(req.user.id)
            res.send({
                err:false,
                message:`Info for user`,
                user: user
            })
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    postUpdate: async(req,res)=>{
        try{
            if (req.body.confirmPW===req.body.password){
                req.body.password=bcrypt.hashSync(req.body.password)
                await User.findByIdAndUpdate(req.user.id,req.body)
                res.send({
                    err:false,
                    message: `Updated user ${req.body.first_name}`
                })
            }
            else{
                throw new Error ("Passwords don't match");
            }
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getUpdate: async(req,res)=>{
        try{
            user = await User.findById(req.user.id);
            res.send({
               err:false,
               message:`User ${req.user.first_name}`,
               user: user
            })
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    deleteUser: async(req,res)=>{
        try{
            const payload = {
                id: req.user.id,
                email: req.user.email,
                first_name: req.user.first_name
              }
              const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: '1s'
              })
              await User.findByIdAndDelete(req.user.id)
              res.send(token);
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    postLogout: (req, res) => {
        try {
          const payload = {
            id: req.user.id,
            email: req.user.email,
            first_name: req.user.first_name
          }
          const token = jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: '1s'
          });
          res.send(token);
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
      }
}