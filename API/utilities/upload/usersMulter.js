const multer = require ("multer");
const fs = require("fs");

const storageUsers= multer.diskStorage({
    destination: function(req,file,cb){
        const path = "public/images/users";
        fs.mkdirSync(path,{recursive:true});
        cb(null,path)
    },
    filename:function(req,file,cb){
        const fileName= `${req.user.id}-${file.originalname}`;
        cb(null,fileName);
    }
})

const uploadUserPic = multer({storage:storageUsers});

module.exports = uploadUserPic;