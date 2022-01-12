const express = require('express');
const router= express.Router();
const controller= require('../controllers/recipes');
const jwt = require('express-jwt');
require('dotenv').config();

router
.get('/breakfast',controller.getBreakfast)
.get('/brunch',controller.getBrunch)
.get('/dinner',controller.getDinner)
.get('/lunch',controller.getLunch)
.get('/recipe/:id',controller.getRecipe)
.post('/myrecipes',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.postRecipe)
.get('/myrecipes',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getMyRecipes)
.get('/myrecipes/:id',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.getMyRecipe)
.patch('/myrecipes/:id',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.postUpdate)
.delete('/myrecipes/:id',jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),controller.deleteMyRecipe)

module.exports = router;


