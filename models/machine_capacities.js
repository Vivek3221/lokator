module.exports = (sequelize, Sequelize) => {
	const MachineCapacities  = sequelize.define(
		'machine_capacities',
		{
			capacity: {
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
			tableName: 'machine_capacities',
			name: {
				singular: 'machine_capacities',
			},
		},
		
	);
	return MachineCapacities;
};
