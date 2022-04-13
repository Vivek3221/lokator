module.exports = (sequelize, Sequelize) => {
	const Inquiries  = sequelize.define(
		'inquiries',
		{
            inquiry_id: {
                type: Sequelize.STRING,
				allowNull: false,
            },
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
            email: {
				type: Sequelize.STRING,
			    allowNull: false,
			},
            user_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
            company_name: {
				type: Sequelize.STRING,
			    allowNull: false,
			},
			phone_no: {
				type: Sequelize.STRING,
			    allowNull: false,
			},
			requirment: {
				type: Sequelize.TEXT,
			    allowNull: false,
			},
			price_type: {
				type: Sequelize.STRING,
			    allowNull: true,
			},
            delivery_date: {
				type: Sequelize.TEXT,
			    allowNull: true,
			},
			location: {
				type: Sequelize.TEXT,
			    allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
			},
			updated_at: {
				type: Sequelize.DATE,
                allowNull: true,
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
			tableName: 'inquiries',
			name: {
				singular: 'inquiries',
			},
		},
		
	);
	return Inquiries;
};