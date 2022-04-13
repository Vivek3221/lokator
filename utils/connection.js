const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
	operatorAlias: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idele: dbConfig.pool.idle,
	}
});

const Connection = {};
Connection.Sequelize = Sequelize;
Connection.sequelize = sequelize;
Connection.Users = require('../models/users')(sequelize, Sequelize);
Connection.Country = require('../models/countries')(sequelize, Sequelize);
Connection.Location = require('../models/locations')(sequelize,Sequelize);
Connection.ContactUs = require('../models/contact_us')(sequelize,Sequelize);
Connection.MachineProducts = require('../models/machine_products')(sequelize,Sequelize);
Connection.MachineCapacities = require('../models/machine_capacities')(sequelize,Sequelize);
Connection.MachineTypes = require('../models/machine_types')(sequelize,Sequelize);
Connection.MachineCategory = require('../models/machine_categories')(sequelize,Sequelize);
Connection.MachineOrder = require('../models/machine_orders')(sequelize,Sequelize);
Connection.MachineOrderDetails = require('../models/machine_order_details')(sequelize,Sequelize);
Connection.Inquiries = require('../models/inquiries')(sequelize,Sequelize);
//Relationship between Country and Users
Connection.Country.hasMany(Connection.Users,{foreignKey:'country_id',constraints:false});
Connection.Users.belongsTo(Connection.Country,{foreignKey:'country_id',constraints:false});

//Relationship between Category and Products
Connection.MachineCategory.hasMany(Connection.MachineProducts,{foreignKey:'category_id',constraints:false});
Connection.MachineProducts.belongsTo(Connection.MachineCategory,{foreignKey:'category_id',constraints:false});


Connection.MachineCapacities.hasMany(Connection.MachineProducts,{foreignKey:'id',constraints:false});
Connection.MachineProducts.belongsTo(Connection.MachineCapacities,{foreignKey:'capacity_id',constraints:false});

Connection.MachineTypes.hasMany(Connection.MachineProducts,{foreignKey:'id',constraints:false});
Connection.MachineProducts.belongsTo(Connection.MachineTypes,{foreignKey:'machine_type_id',constraints:false});

//Relationship between Location and Users
Connection.Location.hasMany(Connection.Users,{foreignKey:'location_id',constraints:false});
Connection.Users.belongsTo(Connection.Location,{foreignKey:'location_id',constraints:false});

//Relationship between machine order detail and category
Connection.Users.hasMany(Connection.MachineOrder,{foreignKey:'user_id',constraints:false});
Connection.MachineOrder.belongsTo(Connection.Users,{foreignKey:'id',constraints:false});

//Relationship between machine order detail and machine product
Connection.MachineProducts.hasMany(Connection.MachineOrderDetails,{foreignKey:'id',constraints:false});
Connection.MachineOrderDetails.belongsTo(Connection.MachineProducts,{foreignKey:'machine_product_id',constraints:false});

//Relationship between machine order detail and category
Connection.MachineCategory.hasMany(Connection.MachineOrderDetails,{foreignKey:'id',constraints:false});
Connection.MachineOrderDetails.belongsTo(Connection.MachineCategory,{foreignKey:'category_id',constraints:false});





sequelize.authenticate().then(()=>{
console.log('Database is connected:')
}).catch(err=>{
 console.log('Error :'+err);
})
module.exports = Connection;
