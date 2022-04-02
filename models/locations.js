module.exports = (sequelize, Sequelize) => {
	const Locations  = sequelize.define(
		'locations',
		{
			country_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			location_name: {
				type: Sequelize.STRING,
				allowNull: false,
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
			tableName: 'locations',
			name: {
				singular: 'locations',
			},
		},
		
	);
	return Locations;
};
