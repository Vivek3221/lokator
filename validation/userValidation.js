const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const DbHelper = require('../validation/validation_db_helper');
const message = require('../config/message');
const bcrypt = require('bcrypt');
const Connection = require('../utils/connection');
const ErrorHandler =require('../utils/responseHandler');
const { Op } = require('sequelize');
const Users = Connection.Users;

/**
 * Description : Parameters validations.
 */

module.exports = {
	signUp: [
		check('first_name').trim().notEmpty().withMessage('First name is required.').isLength({ min: 3, max: 50 }).withMessage('First name have between 3 to 50 character limit.'),
		check('last_name').trim().notEmpty().withMessage('Last name  is required.'),
		check('user_type').trim().notEmpty().withMessage('User type  is required.'),
		check('role_id').trim().notEmpty().withMessage('Role Id is required.'),
		
		// check('email')
		// 	.trim()
		// 	.optional()
		// 	.isEmail()
		// 	.withMessage('Enter a valid email.')
		// 	.custom(async (value, { req }) => {
		// 		var email = req.body.email;
		// 		const chekUserExits = await Users.findOne({ where: { email: email, status: 1 } });
		// 		if (!_.isEmpty(chekUserExits)) {
		// 			throw new Error('User already exists!!!');
		// 		}
		// 	}),
		check('password').trim().notEmpty().withMessage('Password is required.'),
		check('confirm_password')
			.trim()
			.notEmpty()
			.withMessage('Confirm password is required.')
			.custom(async (value, { req }) => {
				var password = req.body.password;
				var confirm_password = req.body.confirm_password;
				if (password !== confirm_password) {
					throw new Error('Password confirmation does not match password');
				}
			}),
		// check('location_id').trim().notEmpty().withMessage('Location is required.'),
		// check('country_id').trim().notEmpty().withMessage('Country is required.'),
		check('company_name').trim().notEmpty().withMessage('Company name is required.'),
		check('phone').trim().notEmpty().withMessage('Phone number is required.')
		.custom(async (value, { req }) => {
			var phone = req.body.phone;
			const chekUserExits = await Users.findOne({ where: { phone: phone, status: 1 } });
			if (!_.isEmpty(chekUserExits)) {
				throw new Error('User already exists!!!');
			}
		}),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],
	signIn: [
		//console.log('ttttttttttttt'),
		check('phone').trim().notEmpty().withMessage('Phone is required.'),
		check('password')
			.trim()
			.notEmpty()
			.withMessage('Password is required.')
			.custom(async (value, { req }) => {
				const phone = req.body.phone;
				console.log(phone);
				const chekUserExits = await Users.findOne({ 
					where: {
						[Op.or]: [{ phone: phone }, { email: phone }]  
					} 
				});
				if (_.isEmpty(chekUserExits)) {
					throw new Error('User not exists!!!');
				}
				if (!_.isEmpty(chekUserExits)) {
					const password = req.body.password;
					console.log(password);
					console.log(chekUserExits.password);
					const validPassword = await bcrypt.compare(password, chekUserExits.password);
					if (!validPassword) {
						throw new Error(message.EMAIL_OR_PASSWORD_MISMATCH);
					}
				}
			}),
			(req, res, next) => {
				const errors = validationResult(req);
				if (!errors.isEmpty()) 
				return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
				next();
			},
	],
	updateProfile: [
		check('first_name').trim().notEmpty().withMessage('First name is required.'), 
		check('last_name').trim().notEmpty().withMessage('Last name is required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],

	changePassword: [
		check('old_password').trim().notEmpty().withMessage('Old password is required.'),
		check('password').trim().notEmpty().withMessage('Password is required.'),
		check('confirm_password')
			.trim()
			.notEmpty()
			.withMessage('Confirm password is required.')
			.custom(async (value, { req }) => {
				if (req.userData) {
					const email = req.userData.email;
					var users = await Users.findOne({ where: { email: email } });
					if (users) {
						const old_password = req.body.old_password;
						const validPassword = await bcrypt.compare(old_password, users.password);
						if (!validPassword) {
							throw new Error(message.IN_VALID_PASSWORD);
						}
					}
				}
				const password = req.body.password;
				const confirm_password = req.body.confirm_password;
				if (password !== confirm_password) {
					throw new Error(message.MISMATCH_PASSWORD);
				}
			}),
			(req, res, next) => {
				const errors = validationResult(req);
				if (!errors.isEmpty()) 
				return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
				next();
			},
	],

	saveCountry: [
	check('name').trim().notEmpty().withMessage('Country name is required.'), 
	check('country_code').trim().notEmpty().withMessage('Country code is required.'),
    (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) 
		return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
		next();
	},
   ],

	updateCountry: [
		check('name').trim().notEmpty().withMessage('Country name is required.'),
		check('country_code').trim().notEmpty().withMessage('Country code is required.'),
		check('id').trim().notEmpty().withMessage('Country id is required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],

	saveLocation: [check('location_name').trim().notEmpty().withMessage('Location name is required.'),
	 check('country_id').trim().notEmpty().withMessage('Country id is required.'),
	 (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) 
		return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
		next();
	},
   ],

	updateLocation: [
		check('location_name').trim().notEmpty().withMessage('Location name is required.'),
		check('country_id').trim().notEmpty().withMessage('Country id is required.'),
		check('id').trim().notEmpty().withMessage('Location id is required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],

	forgotPassword: [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email id is required.')
			.custom(async (value, { req }) => {
				const email = req.body.email;
				console.log(email);
				var users = await Users.findOne({ where: { email: email } });
				if (_.isEmpty(users)) {
					throw new Error('User not exists!!!');
				}
			}),
			(req, res, next) => {
				const errors = validationResult(req);
				if (!errors.isEmpty()) 
				return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
				next();
			},
	],
	contactUs: [
		check('name').trim().notEmpty().withMessage('Name is required.'),
		check('business_name').trim().notEmpty().withMessage('Business name is required.'),
		check('email').trim().notEmpty().withMessage('Email id is required.').isEmail().withMessage('Please Enter a valid email id.'),
		check('phone').trim().notEmpty().withMessage('Phone is required.'),
		check('message').trim().notEmpty().withMessage('Message is required.'),
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],
};
