const Recipe = require('../models/recipe');
const fs=require("fs");

module.exports = {
    getHomePage: async (req, res) => {
        try {
            let recipes = await Recipe.find();
            let NewRecipes = recipes.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
            let PopularRecipes = recipes.sort((a, b) => b.views - a.views).slice(0, 6);
            res.send({
                err: false,
                message: "List of recipes",
                NewRecipes: NewRecipes,
                PopularRecipes: PopularRecipes
            });
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            });
        }
    },
    getMyRecipes: async (req, res) => {
        try {
            recipes = await Recipe.find({ user: req.user.id })
            res.send({
                err: false,
                message: `List of recipes from ${req.user.first_name}`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getMyRecipe: async (req, res) => {
        try {
            recipe = await Recipe.findById(req.params.id);
            res.send({
                err: false,
                message: `My recipe`,
                recipe: recipe
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    postRecipe: async (req, res) => {
        try {
            req.body.user = req.user.id;
            if(req.file){req.body.image = `images/recipes/${req.file.filename}`}
            else {req.body.image = "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"};
            let recipe = await Recipe.create(req.body)
            res.send({
                err: false,
                message: `New recipe created`,
                recipe: recipe
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
            req.body.user = req.user.id;
            recipe= await Recipe.findById(req.params.id);
            if(req.file) {
                req.body.image = `images/recipes/${req.file.filename}`;
                recipeByImage=await Recipe.find({image: recipe.image});
                if(recipeByImage.length === 1 && req.body.image !== recipe.image && recipe.image !== "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900" ){
                    fs.unlinkSync(`public/${recipe.image}`)
                }
            }else{
            req.body.image = "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900"}
            await Recipe.findByIdAndUpdate(req.params.id,req.body)
            res.send({
                err: false,
                message: `Recipe updated`
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message,
            })
        }
    },
    getBreakfast: async (req, res) => {
        try {
            recipes = await Recipe.find({ category: "Breakfast" })
            res.send({
                err: false,
                message: `List of breakfasts`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getBrunch: async (req, res) => {
        try {
            recipes = await Recipe.find({ category: "Brunch" })
            res.send({
                err: false,
                message: `List of brunchs`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getDinner: async (req, res) => {
        try {
            recipes = await Recipe.find({ category: "Dinner" })
            res.send({
                err: false,
                message: `List of dinners`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getLunch: async (req, res) => {
        try {
            recipes = await Recipe.find({ category: "Lunch" })
            res.send({
                err: false,
                message: `List of lunchs`,
                recipes: recipes
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    getRecipe: async (req, res) => {
        try {
            recipe = await Recipe.findById(req.params.id);
            recipe.views += 1;
            recipe.save();
            res.send({
                err: false,
                message: "Recipe",
                recipe: recipe
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    deleteMyRecipe: async (req, res) => {
        try {
            recipe = await Recipe.findById(req.params.id);
            recipeByImage = await Recipe.find({image: recipe.image});
            if (recipeByImage.length === 1 && recipe.image !== "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900")
            {fs.unlinkSync(`public/${recipe.image}`)};
            await Recipe.deleteOne({_id:req.params.id})
            res.send({
                err: false,
                message: "Recipe deleted"
            });
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    }
}