const message = require('../config/message');
const machineCategoryServices = require('../services/machineCategoryServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const Sequelize = require('sequelize');
const commonHelper = require(`../helper/commonHelper`);
const constant = require("../config/constant");


const op = Sequelize.Op;

const {json} = require("body-parser");


let machineCategoryController = {


    uploadImage : async(req, res) => {
        
        try {
            
           var imageName = await commonHelper.uploadImage(req, res);
    
            if (imageName) {
                // image = path.join(__dirname,'files');
                imageName = "http://" + req.headers.host + `/public/files/${imageName}`;
                // console.log(imageName);return false;
                var responseObj = {
                    file: imageName
                }
                return res.send(ResponseHandler.successResponse(responseObj, 'Image uploaded')); 
            } else {
                return res.send(ResponseHandler.successResponse('', 'Image not uploaded'));
            }
    
        } catch (error) {
            console.log(error);
            // handleError(res, error);
        }
    },

    saveCategory: async(req , res)=>{
        try {
            var currentDate = new Date();
            var createdAt = new Date(currentDate.getTime());
            var imagePath = '';
            if(req.body.category_image){
                 imagePath = req.body.category_image;
            }else{
                imagePath = null;
            }
        // console.log(imagePath);return false;
            const data = {
                category_name : req.body.category_name,
                category_image :  imagePath,
                created_at    : createdAt
            };
            const categorySave = await machineCategoryServices.createData(data);   
            if(categorySave){
                return res.send(ResponseHandler.successResponse(categorySave, message.DATA_SAVE));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
                // ResponseHandler.errorAsBadRequest(res, 'Error', '')
            }
        } catch (error) {
            // console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    updateCategory: async(req , res)=>{
        try {
            var currentDate = new Date();
            var updatedAt = new Date(currentDate.getTime());
            var imagePath = '';
            if(Boolean(req.body.category_image)){
                 imagePath = req.body.category_image;
            }else{
                imagePath = null;
            }
            const data = {
                category_name : req.body.category_name,
                category_image : imagePath,
                status         : req.body.status,
                updated_at:updatedAt
            };
            var id = req.body.id;
            const categoryUpdate = await machineCategoryServices.updateData(data , id);
            if(categoryUpdate){
                return res.send(ResponseHandler.successResponse(categoryUpdate, message.DATA_UPDATED));
               
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            //  console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    getCategory: async(req , res)=>{
        try{
            var param = ['id', 'category_name','category_image','status'];
            var page = req.query.page;
            const search = req.query.search;
            const status = req.query.status;


            if(search){
                var searchloc = {
                    category_name : {
                            [op.like]: '%' + search + '%'
                        },
                  }
              
            }else{
                var searchloc = {
                    id : {
                       [op.ne]: null
                   }
               };
            }
            if (status || status == 0) {
                searchloc.status = status;
            }

            if(!page){
                page = 0;
            }
            const categoryList = await machineCategoryServices.getCategoryList(param , res , page ,searchloc);
            // console.log(categoryList);return false;
            if(categoryList.categoryList.length){
                let totalPage = Math.ceil(categoryList.totalCategoryList.length / constant.PAGINATION_LIMIT);
                var catReturn = {
                    totalCount: categoryList.categoryList.length,
                    totalPage: totalPage,
                    categoryList: categoryList.categoryList
                }
                return res.send(ResponseHandler.successResponse(catReturn, message.CATEGORY_LIST));
            }else{
                return res.send(ResponseHandler.recordNotFound('', 'No Data'));
            }
        
        }catch (error) {
            console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },


    

}
module.exports = machineCategoryController;