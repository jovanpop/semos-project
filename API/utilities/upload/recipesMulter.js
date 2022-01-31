const multer = require ("multer");
const fs = require("fs");

const storageRecipes= multer.diskStorage({
    destination: function(req,file,cb){
        const path = "public/images/recipes";
        fs.mkdirSync(path,{recursive:true});
        cb(null,path)
    },
    filename:function(req,file,cb){
        const uniqueTime = new Date().toISOString().replace(/:/g, '-');
        const fileName= `${uniqueTime}-${file.originalname}`;
        cb(null,fileName);
    }
})
const uploadRecipePic = multer({storage:storageRecipes});

module.exports = uploadRecipePic;