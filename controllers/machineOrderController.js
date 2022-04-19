const message = require('../config/message');
const machineOrderServices = require('../services/machineOrderServices');
const machineOrderDetailServices = require('../services/machineOrderDetailServices');
const ResponseHandler = require('../utils/responseHandler');
const commonHelper = require(`../helper/commonHelper`);
const _ = require('lodash');
let machineOrderController = {


    saveOrder : async(req, res) => {
        
        try {
            // get auth user data---------
            var userData    = req.userData;
            // get order req data from req body---------------
            var reqData     = req.body;
            let currentDate = new Date().toISOString().
                                replace(/T/, ' ').      // replace T with a space
                                replace(/\..+/, '')     // delete the dot and everything after;

            let orderId =  await commonHelper.genrateOrderId(6);                   

            if(reqData.order_product !=undefined){

                let orderProduct = reqData.order_product; 
                if(orderProduct.length > 0){
                    
                    for(let i=0; i < orderProduct.length; i++){

                        const orderDetail = {
                            order_id            : orderId,
                            category_id         : orderProduct[i].category_id,
                            machine_product_id  : orderProduct[i].machine_product_id,
                            quantity            : orderProduct[i].quantity,
                            status              : 1
                        }
                        // save order data---------------------------------
                        await machineOrderDetailServices.createData(orderDetail);
                    }

                    const orderData = {
                        order_id : orderId,
                        user_id : userData.id,
                        delivery_location : reqData.delivery_location,
                        work_start_date : reqData.work_start_date,
                        comments_remarks : reqData.comments_remarks,
                        order_scope : reqData.order_scope,
                        status : 0,
                        order_date : currentDate,
                        created_at : currentDate
                    }

                    // save order detail data-------------------------
                    let saveOrder =  await machineOrderServices.createData(orderData);

                    if(saveOrder){
                        return res.send(ResponseHandler.successResponse(saveOrder, message.ORDER_PLASED));
                    }else{
                        return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
                    }
                    
                }else{
                    return res.send(ResponseHandler.errorAsBadRequest(res, 'order_product is required'));
                }

            }else{
                return res.send(ResponseHandler.errorAsBadRequest(res, 'Please define order_product'));
            }
           
    
        } catch (error) {
            console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    },

    orderList : async(req, res) => {
        
        try {
            // get order req data from req body---------------
            var reqData     = req.body;
            if(reqData.role != 0){
                if(reqData.user_id !=undefined && reqData.user_id != ''){

                    const constactDataLists = await machineOrderServices.orderLists(reqData, res);
                    return res.send(ResponseHandler.successResponse(constactDataLists, message.ORDERS_LISTS));
                    
                }else{
                    return res.send(ResponseHandler.errorAsBadRequest(res, 'user_id is required'));
                }
            }else{
                const constactDataLists = await machineOrderServices.orderLists(reqData, res);
                return res.send(ResponseHandler.successResponse(constactDataLists, message.ORDERS_LISTS));
            }
        
        } catch (error) {
            console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    },

    changeOrderStatus : async(req, res) =>{
        try {
            // get order req data from req body---------------
            var reqData     = req.body;
            await machineOrderServices.changeOrderStatus(reqData, res);
            return res.send(ResponseHandler.successResponse({}, message.CHANGE_ORDER_STATUS));
        
        } catch (error) {
            console.log(error);
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    }

}
module.exports = machineOrderController;