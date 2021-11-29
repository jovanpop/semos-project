var express = require('express');
var router = express.Router();
const controller = require("../controllers/users");
const jwt= require('express-jwt');

/* GET users listing. */
router
.post('/register',controller.postUser)
.post('/login',controller.postLogin)
.patch('/',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.updateUser)
.get("/",jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getUser)

module.exports = router;
