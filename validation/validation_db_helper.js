const Connection = require('../utils/connection');
const { Op } = require('sequelize');
const Constant = require('../utils/constant');
const _ = require('lodash');
const Users = Connection.Users;
const bcrypt = require('bcrypt');

module.exports = {
	isUserExists: async (email) => {
		return await Users.findAll({ email: email });
		
	},
};
