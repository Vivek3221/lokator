const fs = require('fs');
const jwt = require("jsonwebtoken");
var express = require('express')
var multer = require('multer')
var path = require("path");
const { nextTick } = require('process');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/\s/g, "_").replace(path.extname(file.originalname), '') + "_" + Date.now() + path.extname(file.originalname));
        req.fileNameStore = file.originalname.replace(/\s/g, "_").replace(path.extname(file.originalname), '') + "_" + Date.now() + path.extname(file.originalname);
        
        
    },
   

});
const upload = multer({ storage: storage });

const uploadImage = async(req, res) => {
  
    try {
        return new Promise((resolve, reject) => {
            upload.single('file')(req, res, function(err, some) {
                if (err) {
                    reject(err) 
                } else {
                   resolve(req.file.filename)
                   
                }
            });
        })
    } catch (error) {
        return false;
    }
}

genrateOrderId = async (length) => {
    var result           = ''; 
    var characters        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
    
}

module.exports = {
    uploadImage,
    upload,
    storage,
    genrateOrderId

}