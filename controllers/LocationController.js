const message = require('../config/message');
const locationServices = require('../services/LocationServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
let locationController = {

    createLocation: async(req , res)=>{
        try {
            var currentDate = new Date();
            var createdAt = new Date(currentDate.getTime());
            
            const data = {
                location_name: req.body.location_name,
			    country_id: req.body.country_id,
                created_at:createdAt
            };
            const locationSave = await locationServices.createData(data);
            if(locationSave){
                return res.send(ResponseHandler.successResponse(locationSave, message.DATA_SAVE));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    },

    updateLocation: async(req , res)=>{
        try {
            var currentDate = new Date();
            var updatedAt = new Date(currentDate.getTime());
            
            const data = {
                location_name: req.body.location_name,
			    country_id: req.body.country_id,
                updated_at:updatedAt
            };
            var id = req.body.id;

            const locationUpdate = await locationServices.updateData(data , id);
            if(locationUpdate){
                return res.send(ResponseHandler.successResponse(locationUpdate, message.DATA_UPDATED));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    },



    getLocation: async(req , res)=>{
        try{
            const search = req.query.search;
            var page = req.query.page;

            if(search){
                var searchloc = {country_id:search}
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
            var param = ['id', 'location_name','country_id'];
            const locationList = await locationServices.getlocationList(param , res,searchloc , page);
            if(locationList.length){
                return res.send(ResponseHandler.successResponse(locationList, message.LOCATION_LIST));
            }else{
                return res.send(ResponseHandler.entityNotFound(res, 'No Data'));
            }
         }catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    }

}

module.exports = locationController;
