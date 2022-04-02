module.exports = (sequelize, Sequelize) => {
	const MachineOrders  = sequelize.define(
		'machine_orders',
		{
			order_id: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
					},
			delivery_location: {
				type: Sequelize.STRING,
				allowNull: false,
					},
			work_start_date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
					},
			comments_remarks: {
				type: Sequelize.TEXT,
				allowNull: false,
					},
			order_scope: {
				type: Sequelize.TEXT,
				allowNull: false,
					},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			order_date: {
				type: Sequelize.TEXT,
			},
			created_at: {
				type: Sequelize.DATE,
			},
			updated_at: {
				type: Sequelize.DATE,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
		},
		{
			timestamps: false,
			underscored: true,
			freezeTableName: true,
			tableName: 'machine_orders',
			name: {
				singular: 'machine_orders',
			},
		},
		
	);
	return MachineOrders;
};
