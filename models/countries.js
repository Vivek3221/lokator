module.exports = (sequelize, Sequelize) => {
	const Countries  = sequelize.define(
		'countries',
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			country_code: {
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
				allowNull:true,
			},
			
			
		},
		{
			timestamps: false,
			underscored: true,
			freezeTableName: true,
			tableName: 'countries',
			name: {
				singular: 'countries',
			},
		},
		
	);
	return Countries;
};
