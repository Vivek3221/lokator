const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const notificationController = require('../controllers/notificationController');

router.put('/update-notification-status', authJwt.verifyToken, notificationController.updateNotification);
router.get('/notification-list', authJwt.verifyToken, notificationController.getNotification);
router.get('/notification-count', authJwt.verifyToken, notificationController.getNotification);

module.exports = router;
