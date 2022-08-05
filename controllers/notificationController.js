const message = require('../config/message');
const notificationServices = require('../services/notificationServices');
const ResponseHandler = require('../utils/responseHandler');
let notificationController = {

    updateNotification: async (req, res) => {
        try {

            if(req.body.notification_type == undefined || req.body.notification_type == ''){
                return res.send(ResponseHandler.errorAsBadRequest(res, 'Notification Type is mandatory'));
            }
            var currentDate = new Date();
            var updatedAt = new Date(currentDate.getTime());
            let type = req.body.notification_type;

            const data = {
                status: 1,
                updated_at: updatedAt
            };

            const condition = {
                notification_type: type.charAt(0).toUpperCase() + type.slice(1),
                receiver_id: req.userData.id,
            }

            const notificationUpdate = await notificationServices.updateNotificationStatus(data, condition);
            if (notificationUpdate) {
                return res.send(ResponseHandler.successResponse(notificationUpdate, message.DATA_UPDATED));
            } else {
                return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
            }
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    },

    getNotification: async (req, res) => {
        try {
            let notificationList = {};
            let param = {
                receiver_id: req.userData.id,
                status: 0
            }
            
            let totalNotification = await notificationServices.getNotificationCount(param);
            if(totalNotification == 0){
                return res.send(ResponseHandler.recordNotFound(notificationList, 'No Data'));
            }

            notificationList.total_notification = totalNotification;

            let notificationTypeList = await notificationServices.getNotificationTypeLists(param);
            if(notificationTypeList.length > 0){
                let notificaType = [];
                
                for(let i = 0; i < notificationTypeList.length; i++){
                    let mainData = {};
                    let dataParm = {
                        receiver_id: req.userData.id,
                        notification_type: notificationTypeList[i].notification_type,
                        status: 0
                    }

                    let typeList = await notificationServices.getNotificationTypeList(dataParm);

                    let notifiDetail = [];
                    let notifiObject = {};

                    for(let n = 0; n < typeList.length; n++){
                        let notifyData =  {};
                        notifyData.id = typeList[n].id;
                        notifyData.detail = typeList[n].details;
                        notifiDetail.push(notifyData);
                    }

                    notifiObject.total = typeList.length;
                    notifiObject.details = notifiDetail;

                    if( notificationTypeList[i].notification_type.toLowerCase() =='register'){
                        mainData.Register = notifiObject
                    }

                    if( notificationTypeList[i].notification_type.toLowerCase() =='product'){
                        mainData.Product = notifiObject
                    }

                    if( notificationTypeList[i].notification_type.toLowerCase() =='order'){
                        mainData.Order = notifiObject
                    }

                    if( notificationTypeList[i].notification_type.toLowerCase() =='machine'){
                        mainData.Machine = notifiObject
                    }

                    if( notificationTypeList[i].notification_type.toLowerCase() =='inquiries'){
                        mainData.Inquiries = notifiObject
                    }
                    
                    notificaType.push(mainData);
                    notificationList.notification = notificaType;
                    
                }
            }
            return res.send(ResponseHandler.successResponse(notificationList, message.NOTIFICATION_LIST));
            
        } catch (error) {
            return res.send(ResponseHandler.errorAsBadRequest(res, 'error'));
        }
    }

}

module.exports = notificationController;
