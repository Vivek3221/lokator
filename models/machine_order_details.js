module.exports = (sequelize, Sequelize) => {
	const MachineOrderDetails  = sequelize.define(
		'machine_order_details',
		{
			order_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			category_id: {
				type: Sequelize.INTEGER,
    			allowNull: false,
			},
   			machine_product_id: {
				type: Sequelize.INTEGER,
    			allowNull: false,
			},
   			quantity: {
				type: Sequelize.INTEGER,
    			allowNull: false,
			},
   			status: {
				type: Sequelize.INTEGER,
    			allowNull: false,
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
			tableName: 'machine_order_details',
			name: {
				singular: 'machine_order_details',
			},
		},
		
	);
	return MachineOrderDetails;
};