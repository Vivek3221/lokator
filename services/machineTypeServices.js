const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const machineTypes = Connection.MachineTypes;
const constant = require("../config/constant")


let machineTypeServices = {
    /**
	 * Description : createMachineType
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         
		var machineTypeCreate = await machineTypes.create(data);
		if (machineTypeCreate) {
			return machineTypeCreate;
		}
	},

    updateData: async (req, id ,res) => {
		try {
			console.log(req);
			if (req) {
				return await machineTypes.update(req,
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

    getTypeList: async (param , res,page,searchloc) => {
		var offset = parseInt(page) * constant.PAGINATION_LIMIT;
		
		try {
			var typeList = await machineTypes.findAll({
                where: searchloc,
                attributes: param,
				offset: offset,
				limit: constant.PAGINATION_LIMIT,
                order : [['id', 'DESC']],

            });
            
			if (typeList) {
				return typeList;
			}
		} catch (error) {
			console.log(error);
		}
	},
}

module.exports = machineTypeServices;