const { check, validationResult } = require('express-validator');
const _ = require('lodash');
const DbHelper = require('../validation/validation_db_helper');
const message = require('../config/message');
const bcrypt = require('bcrypt');
const Connection = require('../utils/connection');
const ErrorHandler =require('../utils/responseHandler');

/**
 * Description : Parameters validations.
 */

module.exports = {

    saveMachineCapacity: [check('capacity').trim().notEmpty().withMessage('Machine capacity is required.'),
	 (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) 
		return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
		next();
	},
   ],

   updateCapacity: [
    check('capacity').trim().notEmpty().withMessage('Machine capacity is required.'),
    check('id').trim().notEmpty().withMessage('Capacity id is required.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
        next();
    },
],

    saveMachineType: [check('type').trim().notEmpty().withMessage('Machine type is required.'),
	 (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) 
		return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
		next();
	},
   ],

   updateTpye: [
        check('type').trim().notEmpty().withMessage('Machine type is required.'),
        check('id').trim().notEmpty().withMessage('Capacity id is required.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
            return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
            next();
        },
    ],

    saveMachineCategory: [
        check('category_name').trim().notEmpty().withMessage('Category name is required.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
            return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
            next();
        },
    ],

    saveMachineOrder: [
        check('delivery_location').trim().notEmpty().withMessage('Delivery location is required.'),
        check('work_start_date').trim().notEmpty().withMessage('Work Start date is required.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
            return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
            next();
        },
    ],

    listMachineOrder: [
        check('role').trim().notEmpty().withMessage('Role is required.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
            return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
            next();
        },
    ],

    editMachineCategory: [
        check('category_name').trim().notEmpty().withMessage('Category name is required.'),
        check('id').trim().notEmpty().withMessage('Category id is required.'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) 
            return res.send(ErrorHandler.errorAsBadRequest(res,JSON.stringify(errors)));
            next();
        },
    ]

}