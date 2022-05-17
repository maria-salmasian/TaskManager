const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../common/config/config');
const user = require('../entity/user');


router.get('/verifytoken', (request, response) => {
    const token = request.header('x-auth-token');

    if(!token){
        return response.status(401).json({success: false, msg: "unauthorized"});    
    }

    try {
        const decoded = jwt.verify (token, config.secret);
        const user =decoded;
        response.json({success: true, token, id: user.id, name: user.name, lastName: user.lastName});
    } catch (exception) {
        response.status(401).json({success: false, msg: "invalid token" + exception});  
    }
});


router.post('/', (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ success: false, msg: "bad request" })
    }
    user.findOne({ email })
        .then(user => {
            if (!user) return response.status(400).json({ success: false, msg:"user not found" });
            if (user.status!=='Active') return response.status(400).json({ success: false, msg:"user not active"});

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return response.status(401).json({ success: false, msg: "invalid credentials" });
                    jwt.sign(
                        {id: user.id, name: user.email, name: user.name, lastName: user.lastName},
                        config.secret,
                        {expiresIn: config.tokenExpire},
                        (err, token) => {
                            if(err){
                                throw err;
                            }
                            else {
                                response.json({success: true, token, user: {id: user.id, name: user.name, lastName: user.lastName}});
                            }
                        }
                    )
                })

        })
});

module.exports = router;