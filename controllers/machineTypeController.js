caconst message = require('../config/message');
const machineTypeServices = require('../services/machineTypeServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const constant = require("../config/constant");


let machineTypeController = {

    saveType: async(req , res)=>{
        try {
            var currentDate = new Date();
            var createdAt = new Date(currentDate.getTime());
            
            const data = {
                type: req.body.type,
                created_at:createdAt
            };
            const typeSave = await machineTypeServices.createData(data);   
            if(typeSave){
                return res.send(ResponseHandler.successResponse(typeSave, message.DATA_SAVE));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
                // ResponseHandler.errorAsBadRequest(res, 'Error', '')
            }
        } catch (error) {
            console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    updateCapacity: async(req , res)=>{
        try {
            var currentDate = new Date();
            var updatedAt   = new Date(currentDate.getTime());
            
            const data = {
                type: req.body.type,
                updated_at:updatedAt
            };
            var id = req.body.id;
            const typeUpdate = await machineTypeServices.updateData(data , id);
            if(typeUpdate){
                return res.send(ResponseHandler.successResponse(typeUpdate, message.DATA_UPDATED));
               
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            //  console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    getType: async(req , res)=>{
        try{
            var param = ['id', 'type','status'];
            var page = req.query.page;
            const search = req.query.search;

            if(search){
                var searchloc = {
                        type : {
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

            if(!page){
                page = 0;
            }
            const typeList = await machineTypeServices.getTypeList(param , res , page ,searchloc);
            if(typeList.length){
                let totalPage = Math.ceil(typeList.length / constant.PAGINATION_LIMIT);
                var typeReturn = {
                    totalCount: typeList.length,
                    totalPage: totalPage,
                    typeList: typeList
                }
                return res.send(ResponseHandler.successResponse(typeReturn, message.TYPE_LIST));
            }else{
                return res.send(ResponseHandler.entityNotFound(res, 'No Data'));
            }
           

        }catch (error) {
            // console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

}

module.exports = machineTypeController;