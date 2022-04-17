const Connection = require('../utils/connection');
const config = require('../config/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const machineOrder = Connection.MachineOrder;
const MachineProducts = Connection.MachineProducts;
const MachineCategory  = Connection.MachineCategory;
const MachineOrderDetails = Connection.MachineOrderDetails;
const Users = Connection.Users;
const Constant = require('../utils/constant');
const _ = require('lodash');
const { Op } = require('sequelize');
//const { Users } = require('../utils/connection');


let machineOrderServices = {

    /**
	 * Description : createmachineOrder
	 * @param {*} req
	 * @param {*} res  
     */
     createData: async (data) => {
         
		var machineOrderCreate = await machineOrder.create(data);
		if (machineOrderCreate) {
			return machineOrderCreate;
		}
	},
	orderLists: async (req,res) => {
		try {
			var page = req.page;
			if(!page){
				page = 0;
			}
			
			var orderData =[];
			var mainOrderData = [];
			var extraWhereCondition ={};
			var partnerMachine = [];
			var partnerMachineOrderID = [];
			var orderID = [];

			var offset = parseInt(page) * Constant.PAGINATION_LIMIT;

			if(req.search){
				const search = req.search.toString().replace(/"/g, '');
				if(search){
					var extraWhereCondition = {
						[Op.or]: [
									{
									'$machine_orders.delivery_location$': { [Op.like]:  `%${search}%` },
									},
									{
									'$machine_orders.order_id$': { [Op.like]: `%${search}%` },
									}
										
						]
					}
				}
			}	

			// role :- 0-Admin, 1-User, 2-Partner------------------------
			if(req.role == 0){
				orderData = await machineOrder.findAll({
					where:extraWhereCondition,
					where:{status:req.status},
					offset: offset,
					include: [
						{
							model: Users,
							required: true,
							attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
						}
					],
					limit: Constant.PAGINATION_LIMIT,
					order : [['id', 'DESC']],
					attributes: ['id','order_id','delivery_location','work_start_date','comments_remarks','order_scope','order_date', 'status', 'created_at']
				});
			} else if(req.role == 1){
				orderData = await machineOrder.findAll({
					where: extraWhereCondition,
					where:{
						status:req.status, 
						user_id: req.user_id
					},
					include: [
						{
							model: Users,
							required: true,
							attributes: ['id', 'first_name', 'last_name', 'email', 'phone']
						}
					],
					order : [['id', 'DESC']],
					offset: offset,
					limit: Constant.PAGINATION_LIMIT,
					order : [['id', 'DESC']],
					attributes: ['id','order_id','delivery_location','work_start_date','comments_remarks','order_scope','order_date','created_at']
				});	
			} else if(req.role == 2){

				let allMachine = await MachineProducts.findAll({
					where:{
						user_id:req.user_id
					},
					attributes: ['id'],
				})
				if(allMachine.length >0){
					for(let p = 0; p < allMachine.length; p++){
						partnerMachine.push(allMachine[p]['id']);
					}
					
				}

				if(!_.isEmpty(partnerMachine)){

					partnerMachineOrderID = await MachineOrderDetails.findAll({
						where:{
							machine_product_id:{
								[Op.in]: partnerMachine
							}
						},
						attributes: ['order_id']
					})
				}

				if(partnerMachineOrderID.length >0){
					for(let orderId = 0; orderId < partnerMachineOrderID.length; orderId++){
						if (!orderID.includes(partnerMachineOrderID[orderId]['order_id']))
						orderID.push(partnerMachineOrderID[orderId]['order_id']);
					}
					
				}

				orderData = await machineOrder.findAll({
					where: extraWhereCondition,
					where:{
						order_id:{
							[Op.in]: orderID
						},
						status:req.status
					},
					include: [
						{
							model: Users,
							required: true,
							attributes: ['id', 'first_name', 'last_name', 'email', 'phone'],
						}
					],
					order : [['id', 'DESC']],
					offset: offset,
					limit: Constant.PAGINATION_LIMIT,
					order : [['id', 'DESC']],
					attributes: ['id', 'order_id', 'delivery_location', 'work_start_date', 'comments_remarks', 'order_scope', 'order_date', 'created_at']
				});
			}	
				
			//console.log(orderData); return false;
			if(!_.isEmpty(orderData)){
				for(var i=0; i<orderData.length; i++){
					
					if(req.role == 2){
						var orderDetail = await MachineOrderDetails.findAll({
							where: {
								order_id: orderData[i]['order_id'],
								status:1
							},
							include: [
								{
									model: MachineCategory,
									required: true,
									attributes: ['id', 'category_image', 'category_name'],
								},
								{
									model: MachineProducts,
									required: true,
									attributes: ['id', 'machine_name', 'machine_image'],
								}
							],
							attributes: ['id', 'quantity', 'created_at', 'machine_product_id','order_id'],
						});

						var mainOrderDetailData = [];

						for(let ordetail = 0; ordetail< orderDetail.length; ordetail++){
							
							if (partnerMachine.includes(orderDetail[ordetail]['machine_product_id'])){
								if(orderData[i]['order_id'] == orderDetail[ordetail]['order_id']){
									mainOrderDetailData.push({
									id:orderDetail[ordetail]['id'],
									quantity:orderDetail[ordetail]['quantity'],
									created_at:orderDetail[ordetail]['created_at'],
									machine_categories:orderDetail[ordetail]['machine_categories'],
									machine_products:orderDetail[ordetail]['machine_products']})
								}
    							
							}
							
						}

						mainOrderData.push({
							id:orderData[i]['id'],
							user_detail:orderData[i]['users'],
							order_id:orderData[i]['order_id'],
							delivery_location:orderData[i]['delivery_location'],
							work_start_date:orderData[i]['work_start_date'],
							comments_remarks:orderData[i]['comments_remarks'],
							order_scope:orderData[i]['order_scope'],
							order_date:orderData[i]['order_date'],
							status:orderData[i]['status'],
							created_at:orderData[i]['created_at'],
							order_detail:mainOrderDetailData
						});


					}else{
						var orderDetail = await MachineOrderDetails.findAll({
							where: {
								order_id: orderData[i]['order_id'],
								status:1
							},
							include: [
								{
									model: MachineCategory,
									required: true,
									attributes: ['id', 'category_image', 'category_name'],
								},
								{
									model: MachineProducts,
									required: true,
									attributes: ['id', 'machine_name', 'machine_image'],
								}
							],
							attributes: ['id', 'quantity', 'created_at'],
						});
					
						mainOrderData.push({
							id:orderData[i]['id'],
							user_detail:orderData[i]['users'],
							order_id:orderData[i]['order_id'],
							delivery_location:orderData[i]['delivery_location'],
							work_start_date:orderData[i]['work_start_date'],
							comments_remarks:orderData[i]['comments_remarks'],
							order_scope:orderData[i]['order_scope'],
							order_date:orderData[i]['order_date'],
							status:orderData[i]['status'],
							created_at:orderData[i]['created_at'],
							order_detail:orderDetail
						});
					}

				}
				let totalPage = Math.ceil(orderData.length / Constant.PAGINATION_LIMIT);
					return {
					totalCount: orderData.length,
					totalPage: totalPage,
					orderData: mainOrderData,
				};
			}else{
				let totalPage = Math.ceil(orderData.length / Constant.PAGINATION_LIMIT);
					return {
					totalCount: orderData.length,
					totalPage: totalPage,
					orderData: [],
				};
			}	
		} catch (error) {
			res.status(500).send({ message: error.message });
		}	
	},
	changeOrderStatus: async (req, res)=>{
		try {
			if (req) {
				return await machineOrder.update(req,
					{
						where: { 
							id: req.order_id
						},
						status: req.status
					}
				);
			}
		} catch (error) {
            console.log(error);
		}
	}


}

module.exports = machineOrderServices;