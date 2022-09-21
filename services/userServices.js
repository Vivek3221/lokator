const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const configEmail = require('../config/email');
const passwordGenrator = require('../helper/password_genrator');
const date = require('date-and-time');
// var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Users      = Connection.Users;
const Location   = Connection.Location;
const Country    = Connection.Country;
const ContactUs  = Connection.ContactUs;
const { Op } = require('sequelize');
let userServices = {
	/**
	 * Description : userSignUp
	 * @param {*} req
	 * @param {*} res
	 */
	userSignUp: async (signUpRequest, res) => {
		try {
			const now = new Date();
			var createdAt = date.format(now, 'YYYY-MM-DD HH:mm:ss');
			var userCreate = await Users.create({
				first_name: signUpRequest.first_name,
				last_name: signUpRequest.last_name,
				email: signUpRequest.email,
				password: await bcrypt.hash(signUpRequest.password, 10),
				location_id: signUpRequest.location_id,
				country_id: signUpRequest.country_id,
				user_type: signUpRequest.user_type,
				company_name: signUpRequest.company_name,
				phone: signUpRequest.phone,
				status: 1,
				is_login: 1,
				role_id : signUpRequest.role_id,
				created_at: createdAt,
			});
			if (userCreate) {
				var token = jwt.sign({ id: userCreate.id, email: userCreate.email, phone: userCreate.phone }, config.secret, {
					expiresIn: 86400, // 24 hours
				});
				const userData = {
					id: userCreate.id,
					first_name: userCreate.first_name,
					last_name: userCreate.last_name,
					email: userCreate.email,
					phone: userCreate.phone,
					company_name: userCreate.company_name,
					accessToken: token,
					locationId: userCreate.location_id
				};
				// const transporter = nodemailer.createTransport(configEmail);
				// const emailToken = jwt.sign(
				// 						{
				// 						user : userCreate.id
				// 					},
				// 					config.secret, 
				// 					{
				// 							expiresIn: 86400, // 24 hours
				// 						}
										
				// );
				// const url = `http://65.2.98.24:8080/api/user/confirmation/${emailToken}`;
				// //const url = `http://localhost:3000/confirmation/${emailToken}`;
				// //console.log(url);
				// const mailOptions = {
				// 	from: 'siddnizam87@gmail.com',
				// 	to: 'nizammca786@gmail.com',
				// 	subject: 'Email Verifications',
				// 	html: `Hi ${_.upperFirst(userCreate.first_name)}, thank you for register with us.,Please click on the link to verify your email address :<a href="${url}">${url}</a> `,
				// };
				// transporter.sendMail(mailOptions, function (error, info) {
				// 	if (error) {
				// 		console.log(error);
				// 	} else {
				// 		console.log('Email sent: ' + info.response);
				// 	}
				// });
				return userData;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	userSignIn: async (signInRequest, res, next) => {
		try {
			console.log(signInRequest);
			var phone = signInRequest.phone;
			var users = await Users.findOne({ where: {
				[Op.or]: [{ phone: phone }, { email: phone }] 
			} 
			});
			if (users) {
				var password = signInRequest.password;
				let validPassword = await bcrypt.compare(password, users.password);
				if (validPassword) {
					var token = jwt.sign({ id: users.id, email: users.email, phone: users.phone }, config.secret, {
						expiresIn: 86400, // 24 hours
					});
					await Users.update(
						{ is_login: 1 },
						{
							where: {
								id: users.id,
							},
							returning: true, // needed for affectedRows to be populated
							plain: true,
						}
					);

					return {
						id: users.id,
						role_id: users.role_id,
						username: users.first_name,
						accessToken: token,
					};
				}
			}
			//	next();
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	/**
	 * Description : User profile data.
	 * @param {} userRequest
	 */
	userProfile: async (userRequest) => {
		try {
			var email = userRequest.email;
			var phone = userRequest.phone;

			if(email){
				var users = await Users.findOne({
					where : {email: email},
					attributes: {
						exclude: ['password'],
					},
				});
			}else {
				var users = await Users.findOne({
					where : {phone:phone},
					attributes: {
						exclude: ['password'],
					},
				});
			}
		
			// return false;
			// var users = await Users.findOne({
			// 	where : {phone:phone},
			// 	attributes: {
			// 		exclude: ['password'],
			// 	},
			// });
			if (users) {
				return users;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	/**
	 * Description : Update User profile
	 * @param {*} userRequest
	 */
	updateUserProfile: async (req, res, next) => {
		try {
			if (req.body) {
				console.log(req.userData);
				var requestUser = req.userData;
				if (requestUser) {
					console.log(req.first_name);
					var updateUser = await Users.update(req.body, {
						where: {
							id: requestUser.id,
						},
						returning: true, // needed for affectedRows to be populated
						plain: true,
					});
					console.log(updateUser);
					return await Users.findOne({
						where: { id: requestUser.id },
						attributes: {
							exclude: ['password'],
						},
					});
				}
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},
	/**
	 * Description : Change password
	 * @param {} req
	 * @param {*} res
	 * @returns
	 */
	changePassword: async (req, res) => {
		try {
			if (req.body) {
				//console.log(req.body);
				var requestUser = req.userData;
				if (requestUser) {
					const password = req.body.password;
					var updateUser = await Users.update(
						{
							password: await bcrypt.hash(password, 10),
						},
						{
							where: {
								id: requestUser.id,
							},
							returning: true, // needed for affectedRows to be populated
							plain: true,
						}
					);
					console.log(updateUser);
					return await Users.findOne({
						where: { id: requestUser.id },
						attributes: {
							exclude: ['password'],
						},
					});
				}
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	logout: async (req, res) => {
		try {
			if (req.userData) {
				var requestUser = req.userData;
				if (requestUser) {
					var updateUser = await Users.update(
						{ is_login: 0 },
						{
							where: {
								id: requestUser.id,
							},
							returning: true, // needed for affectedRows to be populated
							plain: true,
						}
					);
					console.log(updateUser);
					return await Users.findOne({
						where: { id: requestUser.id },
						attributes: {
							exclude: ['password'],
						},
					});
				}
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	// sendEmail: async () => {
	// 	var transporter = nodemailer.createTransport(configEmail);

	// 	var mailOptions = {
	// 		from: 'siddnizam87@gmail.com',
	// 		to: 'nizammca786@gmail.com',
	// 		subject: 'Sending Email using Node.js',
	// 		text: `Hi Smartherd, thank you for your nice Node.js tutorials.
    //       I will donate 50$ for this course. Please send me payment options.`,
	// 		// html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
	// 	};

	// 	transporter.sendMail(mailOptions, function (error, info) {
	// 		if (error) {
	// 			console.log(error);
	// 		} else {
	// 			console.log('Email sent: ' + info.response);
	// 		}
	// 	});
	// },

	confirmation: async (token) => {
	try {

		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
					return res.status(401).send({
							message: "Unauthorized!"
					});
			}
			const confirmationData = decoded;
			var userId = confirmationData.user;
			var updateUser = await Users.update({status:1}, {
				where: {
					id: userId,
				},
				returning: true, // needed for affectedRows to be populated
				plain: true,
			});

			return true;

		});

	} catch (error) {
		
	}	
	},
	
   /**
	* Need to implement SMTP then this function will work
	* @param {*} emailId 
	* @param {*} res 
	* @returns 
	*/
	forgotPassword: async (emailId,res) => {
		try {
		console.log('test');
		const Password = 'test1234';
		//await passwordGenrator.genratePassword(5);
		console.log(Password);	
		// var transporter = nodemailer.createTransport(configEmail);
		const mailOptions = {
			from: 'siddnizam87@gmail.com',
			to: emailId,
			//to: 'nizammca786@gmail.com',
			subject: 'Forgot password',
			text: `Hi Your new password is: ${Password}`,
		};
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		const newPassword =await bcrypt.hash(Password, 10);
		var updateUser    = await Users.update({password:newPassword}, {
			where: {
				email: emailId,
			},
			returning: true, // needed for affectedRows to be populated
			plain: true,
		});

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		return [];
	
		} catch (error) {
			res.status(500).send({ message: error.message });
		}	
		},


		contactUs: async (contactus,res) => {
			try {
			const now = new Date();
			var createdAt = date.format(now, 'YYYY-MM-DD HH:mm:ss');
			const cretateContactUs ={
				name: contactus.name,
				email: contactus.email,
				company_name: contactus.business_name,
				phone: contactus.phone,
				message:contactus.message,
				status: 1,
				created_at: createdAt,
			};
			const contactUsData = await ContactUs.create(cretateContactUs);		
			if(!_.isEmpty(contactUsData)){
				return contactUsData;
			}	
			} catch (error) {
				//res.status(500).send({ message: error.message });
			}	
		},

		contactUsLists: async (req,res) => {
			try {
				var page = req.query.page;
				var offset = parseInt(page) * Constant.PAGINATION_LIMIT;
				if(req.query.search){
					search = req.query.search.toString().replace(/"/g, '');
                	var searchloc = {
						[Op.or]: [
							{'$contact_us.email$': { [Op.like]:  `%${search}%` }},
							{'$contact_us.name$': { [Op.like]:  `%${search}%` }}
						]						
                	}
              
				}
				if(!page){
					page = 0;
				}		
				const contactUsData = await ContactUs.findAll({
					where:searchloc,
					offset: offset,
					limit: Constant.PAGINATION_LIMIT,
					order : [['id', 'DESC']],
				});		
				if(!_.isEmpty(contactUsData)){
					let totalPage = Math.ceil(contactUsData.length / Constant.PAGINATION_LIMIT);
						return {
						totalCount: contactUsData.length,
						totalPage: totalPage,
						contactUsData: contactUsData,
					};
				}	
			} catch (error) {
				res.status(500).send({ message: error.message });
			}	
		},

		usersLists: async (req,res) => {
			try {
				var page = req.query.page;
				var offset = parseInt(page) * Constant.PAGINATION_LIMIT;
				const search = req.query.search;
				if(search){
					var searchloc = {
						[Op.or]: [
							{'$users.email$': { [Op.like]:  `%${search}%` }},
							{'$users.first_name$': { [Op.like]:  `%${search}%` }},
							{'$users.last_name$': { [Op.like]:  `%${search}%` }},
							{'$users.phone$': { [Op.like]:  `%${search}%` }}
						]	
					}
				
				}
			if(!page){
				page = 0;
			}	
			const usersData = await Users.findAll({
				attributes: {
					exclude: ['password'],
				},
			where:searchloc,
			offset: offset,
			order : [['id', 'DESC']],	
			limit: Constant.PAGINATION_LIMIT,
			});		
			if(!_.isEmpty(usersData)){
				let totalPage = Math.ceil(usersData.length / Constant.PAGINATION_LIMIT);
					return {
					totalCount: usersData.length,
					totalPage: totalPage,
					usersData: usersData,
				};
			}	
			} catch (error) {
				res.status(500).send({ message: error.message });
			}	
		},

	/**
	 * Description : User profile data.
	 * @param {} userRequest
	 */
	userProfileById: async (userId) => {
		try {
			var users = await Users.findOne({
				where: {id: userId },
				attributes: {
					exclude: ['password'],
				}
			});
			if (users) {
				return users;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	getUserIds: async (userRoleId) => {
		try {
			var users = await Users.findAll({
				where: {role_id: userRoleId },
				attributes: ['id', 'email']
			});
			if (users) {
				return users;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	}

};

module.exports = userServices;
