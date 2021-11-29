const Recipe = require('../models/recipe');
const User=require('../models/user');

module.exports={
    getHomePage: async(req,res)=>{
        try{
            let recipes = await Recipe.find();
            let NewRecipes =  recipes.slice(-3);
            let PopularRecipes = recipes.sort((a,b)=> b.views-a.views).slice(0,6);
            res.send({
                err:false,
                message: "List of recipes",
                NewRecipes: NewRecipes,
                PopularRecipes: PopularRecipes
            });
        }
        catch (err){
            res.send({
                err:true,
                message:err.message
            });
        }
    },
    getMyRecipes: async (req,res)=>{
        try{
            recipes= await Recipe.find({user : req.user.id})
            res.send({
                err:false,
                message: `List of recipes from ${req.user.first_name}`,
                recipes: recipes
            })
        }
        catch(err){
            res.send({
                err:true,
                message: err.message
            })
        }
    },
    postRecipe: async(req,res)=>{
        try{
            req.body.user= req.user.id;
            let recipe = await Recipe.create(req.body)
            res.send({
                err:false,
                message: `User ${req.user.first_name} created a new recipe`,
                recipe: recipe
            })
        }
        catch(err) {
            res.send({
                err: true,
                message:err.message
            })
        }
    },
    updateRecipe: async(req,res)=>{
        try{
            req.body.user=req.user.id;
            await Recipe.findByIdAndUpdate(req.params.id,req.body);
            res.redirect('/recipes');
        }
        catch(err){
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getBreakfast: async(req,res)=>{
        try{
            recipes= await Recipe.find({category:"Breakfast"})
            res.send({
                err:false,
                message: `List of breakfasts`,
                recipes: recipes
            })
        }
        catch(err){
            res.send({
                err:true,
                message: err.message
            })
        }
    },
    getBrunch: async(req,res)=>{
        try{
            recipes= await Recipe.find({category:"Brunch"})
            res.send({
                err:false,
                message: `List of brunchs`,
                recipes: recipes
            })
        }
        catch(err){
            res.send({
                err:true,
                message: err.message
            })
        }
    },
    getDinner: async(req,res)=>{
        try{
            recipes= await Recipe.find({category:"Dinner"})
            res.send({
                err:false,
                message: `List of dinners`,
                recipes: recipes
            })
        }
        catch(err){
            res.send({
                err:true,
                message: err.message
            })
        }
    },
    getLunch: async(req,res)=>{
        try{
            recipes= await Recipe.find({category:"Lunch"})
            res.send({
                err:false,
                message: `List of lunchs`,
                recipes: recipes
            })
        }
        catch(err){
            res.send({
                err:true,
                message: err.message
            })
        }
    },
    getRecipe: async(req,res)=>{
        try{
            recipe = await Recipe.findById(req.params.id);
            await Recipe.findByIdAndUpdate(recipe.id,{views: recipe.views+1})
            res.send({
                err:false,
                message: "Recipe",
                recipe : recipe
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