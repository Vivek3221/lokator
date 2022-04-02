module.exports ={
	HOST:process.env.DB_HOST,
	USER: process.env.DB_USER,
	PASSWORD: process.env.DB_PASS,
	DB: process.env.DB_NAME,
	DIALECT: process.env.DB_DIALECT,
	logging: false,  
	pool: {
					max:parseInt(process.env.DB_POOL_MAX),
					min:parseInt(process.env.DB_POOL_MIN),
					acquire: parseInt(process.env.DB_POOL_ACQUIRE),
					idle: parseInt(process.env.DB_POOL_IDLE)
	}

}