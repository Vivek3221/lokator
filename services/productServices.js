const Connection = require('../utils/connection');
const Constant = require('../utils/constant');
const config = require('../config/auth');
const configEmail = require('../config/email');
const passwordGenrator = require('../helper/password_genrator');
const date = require('date-and-time');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commonHelper = require(`../helper/commonHelper`);
const _ = require('lodash');
const Users      = Connection.Users;
const Location   = Connection.Location;
const Country    = Connection.Country;
const ContactUs  = Connection.ContactUs;
const MachineCategory  = Connection.MachineCategory;
const MachineType  = Connection.MachineTypes;
const MachineCapacities = Connection.MachineCapacities;

const MachineProducts = Connection.MachineProducts;
const Inquiries = Connection.Inquiries;

const { Op } = require('sequelize');
let userServices = {
	/**
	 * Description : userSignUp
	 * @param {*} req
	 * @param {*} res
	 */
  addProductService: async (req, res) => {
		try {
			const now = new Date();
			var requestUser = req.userData;
			console.log(requestUser);
   var imagePath = null;
   if(req.body.machine_image){
   imagePath = req.body.machine_image;
   }
			var createdAt = date.format(now, 'YYYY-MM-DD HH:mm:ss');
   var addProductsData ={
				machine_name: req.body.machine_name,
				category_id: req.body.category_id,
				machine_image:  imagePath,
				machine_type_id: req.body.machine_type_id,
				capacity_id: req.body.capacity_id,
				description: req.body.description,
				machine_number: req.body.machine_number,
				user_id: requestUser.id,
				status: 1,
				created_at: createdAt,
			}
			console.log(addProductsData);
			var addProduct = await MachineProducts.create(addProductsData);
			if (addProduct) {
				addProduct.machine_image = "http://" + req.headers.host + `/public/files/${addProduct.machine_image}`;
				return addProduct;
			}
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	updateProductService: async (req, res) => {
		try {
			console.log('update here');
			var requestUser = req.userData;
			const now = new Date();
			const productId = req.body.product_id;
			console.log('productId :'+productId);
			var productDetails = await MachineProducts.findOne({
				where: { id: productId },
			})
			var imagePath='';
			if(!_.isEmpty(productDetails)){
			 imagePath = productDetails.machine_image;	
			}
			if(req.body.machine_image){
				imagePath = req.body.machine_image;
			}
			console.log(productDetails);
   //console.log(req.fileNameStore);
			var createdAt = date.format(now, 'YYYY-MM-DD HH:mm:ss');
   var updateProductsData ={
				machine_name: req.body.machine_name,
				category_id: req.body.category_id,
				machine_image:  imagePath,
				machine_type_id: req.body.machine_type_id,
				capacity_id: req.body.capacity_id,
				description: req.body.description,
				machine_number: req.body.machine_number,
				user_id: requestUser.id,
				status: req.body.status,
				created_at: createdAt,
			}
			console.log(updateProductsData);
			var updateProduct = await MachineProducts.update(updateProductsData, {
				where: {
					id: productId,
				},
				returning: true, // needed for affectedRows to be populated
				plain: true,
			});
			
			if (updateProduct) {
				var productDetails = await MachineProducts.findAll({
					where: { id: productId },
					include: [
						{
							model: MachineCategory,
							required: true,
							attributes: ['id','category_image','category_name'],
						},
						{
							model: MachineType,
							required: true,
							attributes: ['id','type'],
						},
					]		
				})
				for (const element of productDetails) {
					var ProductValue = JSON.stringify(element);
					var finalProduct = JSON.parse(ProductValue);
					finalProduct.machine_image = "http://" + req.headers.host + `/public/files/${finalProduct.machine_image}`;
					finalProduct.machine_categories.category_image = "http://" + req.headers.host + `/public/files/${finalProduct.machine_categories.category_image}`;
				}
				return finalProduct;
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: error.message });
		}
	},
	
	editProductDetailService: async (req, res, next) => {
		try {
			const paramId = req.params.id;
			const productData = await MachineProducts.findAll({
				where: {
					id:paramId,
				},
				include: [
					{
						model: MachineCategory,
						required: true,
						attributes: ['id','category_image','category_name'],
					},
					{
						model: MachineType,
						required: true,
						attributes: ['id','type'],
					},
				]	
			});
			if(productData){
				for (const element of productData) {
					var ProductValue = JSON.stringify(element);
					var finalProduct = JSON.parse(ProductValue);
					finalProduct.machine_image = "http://" + req.headers.host + `/public/files/${finalProduct.machine_image}`;
					finalProduct.machine_categories.category_image = "http://" + req.headers.host + `/public/files/${finalProduct.machine_categories.category_image}`;
				}
				return finalProduct;
			}		
		} catch (error) {
			res.status(500).send({ message: error.message });
		}
	},

	/**
	 * Description : User profile data.
	 * @param {} userRequest
	 */
		productListsService:  async (req,res) => {
			try {
				var productsData =[];
				var page     = req.query.page;
				var offset   = parseInt(page) * Constant.PAGINATION_LIMIT;
				const status = req.query.status;
				var extraWhereCondition ={};
				if(req.query.category_id){
					const category = req.query.category_id;
					extraWhereCondition ={
					'$machine_categories.id$': { [Op.eq]: category }
					}
				}
				if (status || status == 0) {
					extraWhereCondition.status = status;
					}
				if(req.query.search){
				const search = req.query.search.toString().replace(/"/g, '');
				if(search){
									var extraWhereCondition = {
										[Op.or]: [
													{
													'$machine_products.machine_name$': { [Op.like]: `%${search}%` }
													},
													{
													'$machine_categories.category_name$': { [Op.like]:  `%${search}%` },
														},
													{
													'$machine_types.type$': { [Op.like]: `%${search}%` }
													}
														
										]
							}
				}
			}						
      	
			if(!page){
							page = 0;
			}					
			productsData = await MachineProducts.findAll({
			where: extraWhereCondition,
			order : [['id', 'DESC']],	
			include: [
					{
						model: MachineCategory,
						required: true,
						attributes: ['id','category_image','category_name'],
					},
					{
						model: MachineType,
						required: true,
						attributes: ['id','type'],
					},
					{
						model: MachineCapacities,
						required: true,
						attributes: ['id','capacity'],
					},
				]
			
			});		
			if(!_.isEmpty(productsData)){
				var productArray =[];
				for (const element of productsData) {
					var ProductValue = JSON.stringify(element);
					var finalProduct = JSON.parse(ProductValue);
					productArray.push({
						id : finalProduct.id,
						machine_name : finalProduct.machine_name,
						category_id : finalProduct.category_id,
						machine_image: finalProduct.machine_image,
						machine_type_id:finalProduct.machine_type_id,
						capacity_id:finalProduct.capacity_id,
						description:finalProduct.description,
						machine_number:finalProduct.machine_number,
						status:finalProduct.status,
						created_at:finalProduct.created_at,
						updated_at:finalProduct.updated_at,
						deleted_at:finalProduct.deleted_at,
						machine_categories:{
							id:finalProduct.machine_categories.id,
							name:finalProduct.machine_categories.category_name,
							category_image :finalProduct.machine_categories.category_image
						},
						machine_types : {
							id : finalProduct.machine_types.id,
							type :finalProduct.machine_types.type,		
						},
						machine_capacities : {
							id : finalProduct.machine_capacities.id,
							type :finalProduct.machine_capacities.capacity,		
						}

					});
			}
			let totalPage = Math.ceil(productsData.length / Constant.PAGINATION_LIMIT);
				return {
					totalCount: productsData.length,
					totalPage: totalPage,
					productsData: productArray,
				};
			}else{
				return {
					totalCount: productsData.length,
					totalPage: 0,
					productsData: productArray,
				};
			}	
			} catch (error) {
				console.log(error);
				//res.status(500).send({ message: error.message });
			}	
		},

	
		contactUsLists: async (req,res) => {
			try {
				var page = req.query.page;
				var offset = parseInt(page) * Constant.PAGINATION_LIMIT;
				const search = req.query.search;
											if(search){
                var searchloc = {
                        capacity : {
                            [Op.like]: '%' + search + '%'
                        }
																								
                  }
              
            }else{
                var searchloc = {
                    id : {
                       [Op.ne]: null
                   }
																		
               };
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
                        capacity : {
                            [Op.like]: '%' + search + '%'
                        },
																								role_id:1
                  }
              
            }else{
                var searchloc = {
                    id : {
                       [Op.ne]: null
                   },
																			role_id:1
               };
      }	
			if(!page){
							page = 0;
			}					
			// const pageAsNumber 		= Number.parseInt(req.query.page);
			// const sizeAsNumber   = Number.parseInt(req.query.size);
			// let page =0;
			// if(!Number.isNaN(pageAsNumber) && pageAsNumber>0){
			// 	page =pageAsNumber;
			// }
			// let size=10;
			// if(!Number.isNaN(sizeAsNumber) && sizeAsNumber>0  && sizeAsNumber<10){
			// 	page =sizeAsNumber;
			// }	
			const usersData = await Users.findAll({
				attributes: {
					exclude: ['password'],
				},
			where:searchloc,
			offset: offset,
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

		saveProductInquiry: async (data) => {
         
			var productInquiryCreate = await Inquiries.create(data);
			if (productInquiryCreate) {
				return productInquiryCreate;
			}
		},

};

module.exports = userServices;
