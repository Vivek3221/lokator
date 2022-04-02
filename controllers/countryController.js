const message = require('../config/message');
const countryServices = require('../services/countryServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');
let countryController = {

    createCountry: async(req , res)=>{
        try {
            
            var currentDate = new Date();
            var createdAt = new Date(currentDate.getTime());
            
            const data = {
                name: req.body.name,
                country_code: req.body.country_code,
                created_at:createdAt
            };
            const countrySave = await countryServices.createData(data);
            
            if(countrySave){
                return res.send(ResponseHandler.successResponse(countrySave, message.DATA_SAVE));
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
                // ResponseHandler.errorAsBadRequest(res, 'Error', '')
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    updateCountry: async(req , res)=>{
        try {
            var currentDate = new Date();
            var updatedAt = new Date(currentDate.getTime());
            
            const data = {
                name: req.body.name,
                country_code: req.body.country_code,
                updated_at:updatedAt
            };
            var id = req.body.id;
            const countrySave = await countryServices.updateData(data , id);
            if(countrySave){
                return res.send(ResponseHandler.successResponse(countrySave, message.DATA_UPDATED));
               
            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    },

    getCountry: async(req , res)=>{
        try{
            var param = ['id', 'name','country_code'];
            var page = req.query.page;
            if(!page){
                page = 0;
            }
            const countryList = await countryServices.getCountryList(param , res , page);
            if(countryList.length){
                return res.send(ResponseHandler.successResponse(countryList, message.COUNTRY_LIST));
            }else{
                return res.send(ResponseHandler.entityNotFound(res, 'No Data'));
            }
           

        }catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));

        }
    }

}

module.exports = countryController;
