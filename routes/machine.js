const express = require('express');
const router  = express.Router();
const { authJwt } = require("../middleware");
const machineCapacityController = require('../controllers/machineCapacityController');
const machineTypeController = require('../controllers/machineTypeController');
const machineCategoryController = require('../controllers/machineCategoryController');
const machineOrderController = require('../controllers/machineOrderController');
const machineValidatioin  = require('../validation/machineValidatioin.js');
var uploadData = require('../helper/commonHelper');
router.post('/save-capacity',machineValidatioin.saveMachineCapacity, machineCapacityController.saveCapacity);
router.post('/update-capacity',machineValidatioin.updateCapacity, machineCapacityController.updateCapacity);
router.get('/get-capacity',machineCapacityController.getCapacity);
router.post('/save-type',machineValidatioin.saveMachineType, machineTypeController.saveType);
router.post('/update-type',machineValidatioin.updateTpye, machineTypeController.updateCapacity);
router.get('/get-type',machineTypeController.getType);
router.post('/upload-image',uploadData.upload.single("file"),machineCategoryController.uploadImage);
router.post('/save-category',machineValidatioin.saveMachineCategory , machineCategoryController.saveCategory);
router.post('/save-order', authJwt.verifyToken, machineValidatioin.saveMachineOrder , machineOrderController.saveOrder);
router.post('/orders', authJwt.verifyToken, machineValidatioin.listMachineOrder , machineOrderController.orderList);
router.post('/update-category',machineValidatioin.editMachineCategory , machineCategoryController.updateCategory);
router.get('/get-category',machineCategoryController.getCategory);




module.exports =router;