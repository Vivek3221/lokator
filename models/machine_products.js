module.exports = (sequelize, Sequelize) => {
	const MachineProducts = sequelize.define(
		'machine_products',
		{
			machine_name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
   			category_id: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			machine_image: {
				type: Sequelize.STRING,
				allowNull: true,
			},
   			machine_type_id: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			capacity_id: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			description: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			machine_number: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			status: {
				type: Sequelize.INTEGER,
    			allowNull: true,
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
			tableName: 'machine_products',
			name: {
				singular: 'machine_products',
			},
		},
		
	);
	return MachineProducts;
};
