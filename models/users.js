module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define(
		'users',
		{
			user_type:{
				type: Sequelize.INTEGER,
    			allowNull: false,
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			company_name: {
				type: Sequelize.STRING,
    			allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
    			allowNull: true,
			},
			password: {
				type: Sequelize.STRING,
    			allowNull: false,
				select: false
			},
			role_id: {
				type: Sequelize.INTEGER,
    			allowNull: true,
			},
   			phone: {
				type: Sequelize.STRING,
    			allowNull: false,
			},
   			otp: {
				type: Sequelize.STRING,
    			allowNull: true,
			},
   			otp_verifiy: {
				type: Sequelize.STRING,
    			allowNull: true,
			},
			is_login: {
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
			tableName: 'users',
			name: {
				singular: 'users',
			},
		},
		
	);
	return Users;
};
