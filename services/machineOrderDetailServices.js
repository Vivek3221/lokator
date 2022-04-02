const Connection = require('../utils/connection');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const machineOrderDetail = Connection.MachineOrderDetails;
const constant = require("../config/constant")


let machineOrderDetailServices = {

    /**
	 * Description : createMachineCategory
	 * @param {*} req
	 * @param {*} res  
     */
    createData: async (data) => {
         
		var machineOrderDetailCreate = await machineOrderDetail.create(data);
		if (machineOrderDetailCreate) {
			return machineOrderDetailCreate;
		}
	}

}

module.exports = machineOrderDetailServices;