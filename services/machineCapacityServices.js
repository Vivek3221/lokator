const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const machineCapacities = Connection.MachineCapacities;
const constant = require("../config/constant")


let machineCapacityServices = {
    /**
	 * Description : createMachineCapacity
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         
		var machineCapacityCreate = await machineCapacities.create(data);
		if (machineCapacityCreate) {
			return machineCapacityCreate;
		}
	},

    updateData: async (req, id ,res) => {
		try {
			console.log(req);
			if (req) {
				return await machineCapacities.update(req,
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

    getCapacityList: async (param , res,page,searchloc) => {
		var offset = parseInt(page) * constant.PAGINATION_LIMIT;
		console.log(offset);
		// return false;
		try {
			var capacityList = await machineCapacities.findAll({
                where: searchloc,
                attributes: param,
				offset: offset,
				limit: constant.PAGINATION_LIMIT,
                order : [['id', 'DESC']],

            });
            
			if (capacityList) {
				return capacityList;
			}
		} catch (error) {
			console.log(error);
		}
	},
}
module.exports = machineCapacityServices;
