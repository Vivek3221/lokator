const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const country = Connection.Country;
const constant = require("../config/constant")


let countryServices = {
	/**
	 * Description : createCountry
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         
		var countryCreate = await country.create(data);
		if (countryCreate) {
			return countryCreate;
		}
	},

    getCountryList: async (param , res,page) => {
		var offset = parseInt(page) * constant.PAGINATION_LIMIT;
		console.log(offset);
		// return false;
		try {
			var countryList = await country.findAll({
                attributes: param,
				offset: offset,
				limit: constant.PAGINATION_LIMIT,
                order : [['id', 'DESC']],

            });
            
			if (countryList) {
				return countryList;
			}
		} catch (error) {
			console.log(error);
		}
	},

	updateData: async (req, id ,res) => {
		try {
			console.log(req);
			if (req) {
				return await country.update(req,
					{
						where: { 
							id: id
						},
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

module.exports = countryServices;
