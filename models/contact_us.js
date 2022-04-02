module.exports = (sequelize, Sequelize) => {
	const ContactUs  = sequelize.define(
		'contact_us',
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
			    allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
			    allowNull: true,
			},
			company_name: {
				type: Sequelize.STRING,
			    allowNull: true,
			},
			message: {
				type: Sequelize.STRING,
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
				allowNull:true,
			},
			
			
		},
		{
			timestamps: false,
			underscored: true,
			freezeTableName: true,
			tableName: 'contact_us',
			name: {
				singular: 'contact_us',
			},
		},
		
	);
	return ContactUs;
};
