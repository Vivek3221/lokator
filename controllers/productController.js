const message = require('../config/message');
const productServices = require('../services/productServices');
const ResponseHandler = require('../utils/responseHandler');
const { check, validationResult } = require('express-validator');
const Constant = require('../utils/constant');
const _ = require('lodash');
const { Op } = require('sequelize');
let userController = {
	/**
	 * Description : User signUp
	 * @param {*} req
	 * @param {*} res
	 * @returns
	 */

  addProduct: async (req, res) => {
		try {
   console.log(req.body);
			var addProduct = await productServices.addProductService(req, res);
			if (addProduct) {
				return res.send(ResponseHandler.successResponse(addProduct, message.ADD_PRODUCT));
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	updateProduct: async (req, res) => {
		try {
   console.log(req.body);
			var updateProduct = await productServices.updateProductService(req, res);
			if (updateProduct) {
				return res.send(ResponseHandler.successResponse(updateProduct, message.UPDATE_PRODUCT));
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	/**
	 * Description: get Logged In User Profile.
	 * @returns
	 */
		editProduct: async (req, res) => {
			try {
				const productDetails = await productServices.editProductDetailService(req, res);
				if (productDetails) 
				return res.send(ResponseHandler.successResponse(productDetails, message.PRODUCT_DETAILS));
			} catch (error) {
				console.log(error);
				//res.status(500).send({ message: error.message });
			}
	},
	productLists: async (req, res) => {
		try {
			const productDetails = await productServices.productListsService(req, res);
			if (productDetails) 
			return res.send(ResponseHandler.successResponse(productDetails, message.PRODUCT_DETAILS));
		} catch (error) {
			console.log(error);
			//res.status(500).send({ message: error.message });
		}
},
	
	/**
	 * Description  : Update profile
	 * @param {*} userRequest
	 * @returns
	 */
	updateUserProfile: async (req, res, next) => {
		try {
			if (req) {
				const userProfile = await userServices.updateUserProfile(req, res);
				return res.send(ResponseHandler.successResponse(userProfile, message.USER_PROFILE_UPDATE));
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	/**
	 * Description  : Change password
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @returns
	 */
	changePassword: async (req, res, next) => {
		try {
			if (req) {
				const changePassword = await userServices.changePassword(req, res);
				return res.send(ResponseHandler.successResponse(changePassword, message.CHANGE_PASSWORD));
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	/**
	 * Description : User logout
	 * @param {D} req
	 * @param {*} res
	 * @returns
	 */
	userLogout: async (req, res) => {
		try {
			const userLogout = await userServices.logout(req, res);
			return res.send(ResponseHandler.successResponse(userLogout, message.USER_LOGOUT));
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	sendEmail: async (req, res) => {
		try {
			const userLogout = await userServices.sendEmail(req, res);
			return res.send(ResponseHandler.successResponse(userLogout, message.USER_LOGOUT));
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	confirmation: async (req, res) => {
		try {
			const confirmationId = req.params.id;
			const userLogout = await userServices.confirmation(confirmationId);
			return res.send(ResponseHandler.successResponse(userLogout, message.USER_LOGOUT));
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	forgotPassword: async (req, res) => {
		try {
			const emailId = req.body.email;
			const forgotPassword = await userServices.forgotPassword(emailId);
			return res.send(ResponseHandler.successResponse(forgotPassword, message.FORGOT_PASSWORD));
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	contactUs: async (req, res) => {
		try {
			const constactData = await userServices.contactUs(req.body, res);
			return res.send(ResponseHandler.successResponse(constactData, message.SAVE_CONTACTUS));
		} catch (error) {
			// return res.send(ResponseHandler.errorResponse(JSON.stringify(error.message), 'Unable to fetch the business contract list'));
		}
	},
	contactUsLists: async (req, res) => {
		try {
			const constactDataLists = await userServices.contactUsLists(req, res);
			return res.send(ResponseHandler.successResponse(constactDataLists, message.CONTACTUS_LISTS));
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	getAllUsers: async (req, res) => {
		try {
			const userDataLists = await userServices.usersLists(req, res);
			if (userDataLists) {
				return res.send(ResponseHandler.successResponse(userDataLists, message.USER_LISTS));
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
};

module.exports = userController;
