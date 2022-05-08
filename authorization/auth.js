const config = require('../common/config/config');
const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    const token = request.header('x-auth-token');

    if(!token){
        return response.status(401).json({success: false, msg: "unauthorized"});    
    }

    try {
        const decoded = jwt.verify (token, config.secret);
        request.user = decoded;
        next();
    } catch (exception) {
        response.status(401).json({success: false, msg: "unauthorized" + exception});  
    }
  
}

module.exports = auth;