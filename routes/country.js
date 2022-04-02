const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const countryController     = require('../controllers/countryController');
const locationController     = require('../controllers/LocationController');
const validationParam  = require('../validation/userValidation.js');

router.post('/save',validationParam.saveCountry, countryController.createCountry);
router.post('/update',validationParam.updateCountry, countryController.updateCountry);
router.post('/save-location',validationParam.saveLocation, locationController.createLocation);
router.post('/update-location',validationParam.updateLocation, locationController.updateLocation);
router.get('/get-country',countryController.getCountry);
router.get('/get-location',locationController.getLocation);
// router.post('/updateProfile',authJwt.verifyToken,validationParam.updateProfile, userController.updateUserProfile);
// router.post('/changePassword',authJwt.verifyToken,validationParam.changePassword, userController.changePassword);
module.exports =router;