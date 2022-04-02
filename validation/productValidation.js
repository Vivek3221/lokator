const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const DbHelper = require('../validation/validation_db_helper');
const message = require('../config/message');
const bcrypt = require('bcrypt');
const Connection = require('../utils/connection');
const ErrorHandler =require('../utils/responseHandler');
const { Op } = require('sequelize');
const Users = Connection.Users;
const MachineCategory = Connection.MachineCategory;
const MachineTypes = Connection.MachineTypes;
const MachineCapacities = Connection.MachineCapacities;
const MachineProducts = Connection.MachineProducts;

/**
 * Description : Parameters validations.
 */

module.exports = {
	addProduct: [
		check('machine_name').trim().notEmpty().withMessage('Machine name is required.').isLength({ min: 3, max: 50 }).withMessage('First name have between 3 to 50 character limit.'),
		check('category_id').trim().notEmpty().withMessage('Category is required.')
  .custom(async (value, { req }) => { 
			var categoryId = req.body.category_id;
			const chekUserExits = await MachineCategory.findOne({ where: { id: categoryId, status: 1 } });
			if (_.isEmpty(chekUserExits)) {
				throw new Error('Machine category not exists!!!');
			}
		}),
  // check('machine_image').trim().notEmpty().withMessage('Machine image is required.'),
  check('machine_type_id').trim().notEmpty().withMessage('Machine Type is required.')
  .custom(async (value, { req }) => { 
			var machineTypeId = req.body.machine_type_id;
			const machineType = await MachineTypes.findOne({ where: { id: machineTypeId, status: 1 } });
			if (_.isEmpty(machineType)) {
				throw new Error('Machine type not exists!!!');
			}
		}),
  check('capacity_id').trim().notEmpty().withMessage('Capacity is required.')
  .custom(async (value, { req }) => { 
			var capacityId = req.body.capacity_id;
			const machineType = await MachineCapacities.findOne({ where: { id: capacityId, status: 1 } });
			if (_.isEmpty(machineType)) {
				throw new Error('Machine capacity not exists!!!');
			}
		}),
  check('description').trim().notEmpty().withMessage('Description is required.'),
  check('machine_number').trim().notEmpty().withMessage('Machine number is required.'),
  (req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
 ],

	updateProduct: [
  check('produnct_id').trim().notEmpty().withMessage('Product id is required.')
  .custom(async (value, { req }) => { 
			var produnctId = req.body.produnct_id;
			const checkProduncExits = await MachineProducts.findOne({ where: { id: produnctId, status: 1 } });
			if (_.isEmpty(checkProduncExits)) {
				throw new Error('Product not exists!!!');
			}
		}),
		check('machine_name').trim().notEmpty().withMessage('Machine name is required.').isLength({ min: 3, max: 50 }).withMessage('Machine name have between 3 to 50 character limit.'),
		check('category_id').trim().notEmpty().withMessage('Category is required.')
  .custom(async (value, { req }) => { 
			var categoryId = req.body.category_id;
			const chekUserExits = await MachineCategory.findOne({ where: { id: categoryId, status: 1 } });
			if (_.isEmpty(chekUserExits)) {
				throw new Error('Machine category not exists!!!');
			}
		}),
  // check('machine_image').trim().notEmpty().withMessage('Machine image is required.'),
  check('machine_type_id').trim().notEmpty().withMessage('Machine Type is required.')
  .custom(async (value, { req }) => { 
			var machineTypeId = req.body.machine_type_id;
			console.log('machine_type_id**************** :'+machineTypeId);
			const machineType = await MachineTypes.findOne({ where: { id: machineTypeId, status: 1 } });

			if (_.isEmpty(machineType)) {
				throw new Error('Machine type not exists!!!');
			}
		}),
  check('capacity_id').trim().notEmpty().withMessage('Capacity is required.')
  .custom(async (value, { req }) => { 
			var capacityId = req.body.capacity_id;
			const machineType = await MachineCapacities.findOne({ where: { id: capacityId, status: 1 } });
			if (_.isEmpty(machineType)) {
				throw new Error('Machine capacity not exists!!!');
			}
		}),
  check('description').trim().notEmpty().withMessage('Description is required.'),
  check('machine_number').trim().notEmpty().withMessage('Machine number is required.'),
  check('user_id').trim().notEmpty().withMessage('User is required.')
  .custom(async (value, { req }) => { 
			var userId = req.body.user_id;
			const User = await Users.findOne({ where: { id: userId, status: 1 } });
			if (_.isEmpty(User)) {
				throw new Error('User is not exists!!!');
			}
		})
	],
	editProduct: [
		check('id').trim().notEmpty().withMessage('Product id is required.')
  .custom(async (value, { req }) => { 
			var produnctId = req.params.id;
			const checkProduncExits = await MachineProducts.findOne({ where: { id: produnctId, status: 1 } });
			if (_.isEmpty(checkProduncExits)) {
				throw new Error('Product not exists!!!');
			}
		}), 
		(req, res, next) => {
			console.log(req.params.id);
			const errors = validationResult(req);
			if (!errors.isEmpty()) 
			return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
			next();
		},
	],


};
