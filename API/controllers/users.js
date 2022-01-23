const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require("fs");
require('dotenv').config();

module.exports = {
    postUser: async (req, res) => {
        try {
            req.body.email = req.body.email.toLowerCase();
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                throw new Error('This email is already taken !')
            } else {
                req.body.image = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                await User.create(req.body)
            }
            res.send({
                err: false,
                message: "User created",
                user: user
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            });
        }
    },
    postLogin: async (req, res) => {
        try {
            req.body.email = req.body.email.toLowerCase();
            user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const payload = {
                id: user._id,
                email: user.email,
                first_name: user.first_name
            }
            token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send({
                err: false,
                message: "User logged in ",
                token: token,
                userPW: user.password
            });
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            });
        }
    },
    getUser: async (req, res) => {
        try {
            user = await User.findById(req.user.id)
            res.send({
                err: false,
                message: `Info for user`,
                user: user
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    postUpdate: async (req, res) => {
        try {
            user=await User.findById(req.user.id)
            req.body.email=req.body.email.toLowerCase();
            if(req.file) {
                req.body.image = `images/users/${req.file.filename}`;
                if(req.body.image !== user.image && user.image !== "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" ){
                    fs.unlinkSync(`public/${user.image}`)
                }
            }else{
            req.body.image = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                user = await User.findByIdAndUpdate(req.user.id, req.body)
                res.send({
                    err: false,
                    message: `Updated user`
                })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    }
    // deleteUser: async (req, res) => {
    //     try {
    //         const payload = {
    //             id: req.user.id
    //         }
    //         token = jwt.sign(payload, process.env.JWT_SECRET, {
    //             expiresIn: '1s'
    //         })
    //         await User.findByIdAndDelete(req.user.id)
    //         res.send({
    //             err: false,
    //             message: "User Deleted",
    //             token: token
    //         });
    //     }
    //     catch (err) {
    //         res.send({
    //             err: true,
    //             message: err.message
    //         })
    //     }
    // },
    // putLogout: async (req, res) => {
    //     try {
    //         const payload = {
    //             id: req.user.id
    //         }
    //         token = jwt.sign(payload, process.env.JWT_SECRET, {
    //             expiresIn: '1s'
    //         })
    //         res.send({
    //             err: false,
    //             message: "User Deleted",
    //             token: token
    //         });
    //     }
    //     catch (err) {
    //         res.send({
    //             err: true,
    //             message: err.message
    //         })
    //     }
    // }
}