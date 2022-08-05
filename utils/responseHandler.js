const message = require('../config/message');
const httpResponse = require('../utils/httpResponseCode');
module.exports = {

    successResponse: (data, message) => {
        return {
            statusCode: httpResponse.OK,
            message: message ?  message : 'Success',
            data: data
        };
    },
    errorAsBadRequest: (res, error) => {
        res.status(httpResponse.BAD_REQUEST)
            .send(module.exports.createResponseObject(httpResponse.BAD_REQUEST,'Something went wrong.',[],error));
    }  
    ,
    errorResponse: (error, message) => {
        res.status(httpResponse.BAD_REQUEST)
            .send(module.exports.createResponseObject(httpResponse.INTERNAL_SERVER_ERROR,'Internal server error',[],error));
    },
    createResponseObject :(statusCode, message,data,error) =>{
        return {
            statusCode: statusCode ?  statusCode :  httpResponse.OK,
            message: message ?  message : 'Success',
            data: data,
            error:error
        };
    },

    entityNotFound: (res, error) => {
        res.status(httpResponse.RESOURCE_DELETED)
            .send(module.exports.createResponseObject(httpResponse.BAD_REQUEST,'Error',[],error));
    },
    
    recordNotFound: (data, message) => {
        return {
            statusCode: httpResponse.OK,
            message: message ?  message : 'Success',
            data: data
        };
    } 
} 

