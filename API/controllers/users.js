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
            if(!req.body.confirmPW===req.body.password){
                throw new Error("Passwords don't match")
            }
            req.body.password=bcrypt.hashSync(req.body.password);
            user=await User.create(req.body);
            

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
                expiresIn: "365d"
            });
            res.send({
                err:false,
                message:"User logged in ",
                token:token
            });
        }
        catch(err){
            res.send({
                err:true,
                message:error.message
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
    updateUser: async(req,res)=>{
        try{
            await User.findByIdAndUpdate(req.user.id,req.body);
            if (!req.body.confirmPW===req.body.password){
                throw new Error ("Passwords don't match")
            }
            res.send({
                err:false,
                message: `Updated user ${req.body.first_name}`
            })
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
    }
}
}