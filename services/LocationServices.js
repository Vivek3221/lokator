const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const location = Connection.Location;
const constant = require("../config/constant")


let LocationServices = {
	/**
	 * Description : createlocation
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         console.log(data);
		var locationSave = await location.create(data);
		if (locationSave) {
			return locationSave;
		}
	},

    getlocationList: async (param , res ,searchloc ,page) => {
		var offset = parseInt(page) * constant.PAGINATION_LIMIT;

		try {
			var locationList = await location.findAll({
				where: searchloc,
                attributes: param,
				offset: offset,
				limit: constant.PAGINATION_LIMIT,
                order : [['id', 'DESC']]
            });
            
			if (locationList) {
				return locationList;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	updateData: async (req, id ,res) => {
		try {
			if (req) {
				return await location.update(req,
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
			res.status(500).send({ message: error.message });
		}
	},


}

module.exports = LocationServices;
