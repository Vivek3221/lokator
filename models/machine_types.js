module.exports = (sequelize, Sequelize) => {
	const MachineTypes  = sequelize.define(
		'machine_types',
		{
			type: {
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
			tableName: 'machine_types',
			name: {
				singular: 'machine_types',
			},
		},
		
	);
	return MachineTypes;
};
