const message = require('../config/message');
const machineCapacityServices = require('../services/machineCapacityServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const constant = require("../config/constant");


let machineCapacityController = {

    saveCapacity: async(req , res)=>{
        try {
            var currentDate = new Date();
            var createdAt = new Date(currentDate.getTime());
            
            const data = {
                capacity: req.body.capacity,
                created_at:createdAt
            };
            const capacitySave = await machineCapacityServices.createData(data);   
            if(capacitySave){
                return res.send(ResponseHandler.successResponse(capacitySave, message.DATA_SAVE));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
                // ResponseHandler.errorAsBadRequest(res, 'Error', '')
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    updateCapacity: async(req , res)=>{
        try {
            var currentDate = new Date();
            var updatedAt = new Date(currentDate.getTime());
            
            const data = {
                capacity: req.body.capacity,
                updated_at:updatedAt
            };
            var id = req.body.id;
            const capacityUpdate = await machineCapacityServices.updateData(data , id);
            if(capacityUpdate){
                return res.send(ResponseHandler.successResponse(capacityUpdate, message.DATA_UPDATED));
               
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            //  console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    getCapacity: async(req , res)=>{
        try{
            var param = ['id', 'capacity','status'];
            var page = req.query.page;
            const search = req.query.search;

            if(search){
                var searchloc = {
                        capacity : {
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

            const capacityList = await machineCapacityServices.getCapacityList(param , res , page ,searchloc);
            if(capacityList.capacityList.length){
                let totalPage = Math.ceil(capacityList.totalCapacityList.length / constant.PAGINATION_LIMIT);
                var capReturn = {
                    totalCount: capacityList.capacityList.length,
                    totalPage: totalPage,
                    capacityList: capacityList.capacityList
                }
                return res.send(ResponseHandler.successResponse(capReturn, message.CAPACITY_LIST));
            }else{
                return res.send(ResponseHandler.recordNotFound(capReturn, 'No Data'));
            }
           

        }catch (error) {
            console.log(error);
            // return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

}

module.exports = machineCapacityController;
