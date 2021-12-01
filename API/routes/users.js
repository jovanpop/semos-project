var express = require('express');
var router = express.Router();
const controller = require("../controllers/users");
const jwt= require('express-jwt');

/* GET users listing. */
router
.post('/register',controller.postUser)
.post('/login',controller.postLogin)
.post('/logout',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.postLogout)
.patch('/update',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.postUpdate)
.get('/update',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getUpdate)
.get("/",jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getUser)
.delete('/',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.deleteUser)
module.exports = router;
