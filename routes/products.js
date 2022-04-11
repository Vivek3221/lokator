const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const productController     = require('../controllers/productController');
const validationParam  = require('../validation/productValidation');
var uploadData = require('../helper/commonHelper');
router.post('/add-product',authJwt.verifyToken,validationParam.addProduct,productController.addProduct);
router.post('/update-product',authJwt.verifyToken,validationParam.updateProduct, productController.updateProduct);
router.get('/edit-product/:id',validationParam.editProduct,productController.editProduct);
router.get('/product-lists',productController.productLists);
router.post('/inquiry', productController.saveProductInquiry);
router.post('/inquiry/list', productController.inquiryList);
// router.post('/delete-product',machineValidatioin.saveMachineType, machineTypeController.saveType);
// router.post('/upload-image',machineCategoryController.uploadImage);
// router.post('/save-category',machineValidatioin.saveMachineCategory , machineCategoryController.saveCategory);
module.exports =router;
