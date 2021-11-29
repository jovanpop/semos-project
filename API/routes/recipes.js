const express = require('express');
const router= express.Router();
const controller= require('../controllers/recipes');
const jwt = require('express-jwt');
require('dotenv').config();

router
.get('/',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getMyRecipes)
.get('/:id',controller.getRecipe)
.post('/',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.postRecipe)
.patch('/:id',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.updateRecipe)
.get('/breakfast',controller.getBreakfast)
.get('/brunch',controller.getBrunch)
.get('/dinner',controller.getDinner)
.get('/lunch',controller.getLunch)

module.exports = router;


