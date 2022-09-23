const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const userController     = require('../controllers/userController');
const validationParam  = require('../validation/userValidation.js');

router.post('/signUp',validationParam.signUp, userController.signUp);
router.post('/signIn',validationParam.signIn, userController.signIn);
router.get('/getProfile',authJwt.verifyToken,userController.getUserProfile);
router.post('/updateProfile',authJwt.verifyToken,validationParam.updateProfile, userController.updateUserProfile);
router.post('/changePassword',authJwt.verifyToken,validationParam.changePassword, userController.changePassword);
router.post('/forgotPassword',validationParam.forgotPassword, userController.forgotPassword);
router.post('/logout',authJwt.verifyToken,userController.userLogout);
router.post('/email',userController.sendEmail);
router.get('/confirmation/:id',userController.confirmation);
router.post('/contactUs',validationParam.contactUs,userController.contactUs);
router.get('/contactUsLists',authJwt.verifyToken,userController.contactUsLists);
router.get('/usersLists',authJwt.verifyToken,userController.getAllUsers);
module.exports =router;
