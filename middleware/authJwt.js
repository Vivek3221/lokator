const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const Connection = require('../utils/connection');
const User = Connection.Users;

let authJwt ={

verifyToken : async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
   jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userData = decoded;
    var requestUser = req.userData;
    var userId = requestUser.id;
    var usersData = await User.findOne({ where: { id: userId } });
    if(usersData){
     if(usersData.is_login==0){
      return res.status(401).send({
        message: "Unauthorized!"
      });
     } 
    }
    next();
    
  });
}

}
module.exports = authJwt;