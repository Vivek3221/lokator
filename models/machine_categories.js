module.exports = (sequelize, Sequelize) => {
	const MachineCategories  = sequelize.define(
		'machine_categories',
		{
			category_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			category_image: {
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
			tableName: 'machine_categories',
			name: {
				singular: 'machine_categories',
			},
		},
		
	);
	return MachineCategories;
};
