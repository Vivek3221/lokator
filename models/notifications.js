module.exports = (sequelize, Sequelize) => {
	const Notification  = sequelize.define(
		'notifications',
		{
			notification_type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            sender_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            receiver_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            details: {
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
			}
		},
		{
			timestamps: false,
			underscored: true,
			freezeTableName: true,
			tableName: 'notifications',
			name: {
				singular: 'notifications',
			},
		},
		
	);
	return Notification;
};
