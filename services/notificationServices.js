const Connection = require('../utils/connection');
const notification = Connection.Notifications;


let notificationServices = {
    /**
     * Description : createCountry
     * @param {*} req
     * @param {*} res  
     */
    createNotification: async (data) => {

        var notificationCreate = await notification.create(data);
        if (notificationCreate) {
            return notificationCreate;
        }
    },

    getNotificationTypeList: async (param) => {
        try {
            var notificationList = await notification.findAll({
                where: param,
                attributes: ['id', 'notification_type', 'details']

            });
            return notificationList;
        } catch (error) {
            console.log(error);
        }
    },

    getNotificationTypeLists: async (param) => {
        try {
            var notificationList = await notification.findAll({
                where: param,
                attributes: ['notification_type'],
                group: "notification_type"

            });
            return notificationList;
        } catch (error) {
            console.log(error);
        }
    },

    getNotificationCount: async (param) => {
        try {
            var notificationCount = await notification.count({
                where: param

            });
            return notificationCount;
        } catch (error) {
            console.log(error);
        }
    },

    updateNotificationStatus: async (req, condition) => {
        try {
            if (req) {
                return await notification.update(req,
                    {
                        where: condition,
                        returning: true, // needed for affectedRows to be populated
                        plain: true
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    },


}

module.exports = notificationServices;
