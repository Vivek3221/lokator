const Connection = require('../utils/connection');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const machineCategory = Connection.MachineCategory;
const constant = require("../config/constant")


let machineCategoryServices = {

    /**
	 * Description : createMachineCategory
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         
		var machineCategoryCreate = await machineCategory.create(data);
		if (machineCategoryCreate) {
			return machineCategoryCreate;
		}
	},

    updateData: async (req, id ,res) => {
		try {
			console.log(req);
			if (req) {
				return await machineCategory.update(req,
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

    getCategoryList: async (param , res,page,searchloc) => {
       var offset = parseInt(page) * constant.PAGINATION_LIMIT;
		console.log(offset);
		// return false;
		try {
			var categoryList = await machineCategory.findAll({
                where: searchloc,
                attributes: param,
				offset: offset,
				limit: constant.PAGINATION_LIMIT,
                order : [['id', 'DESC']],

            });
            
			if (categoryList) {
				return categoryList;
			}
		} catch (error) {
			console.log(error);
		}
	},

    categoryCount:async(condition)=>{
        return machineCategory.count({ where: condition})
    }

}

module.exports = machineCategoryServices;