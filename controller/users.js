const express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const config = require('../common/config/config');
const auth = require ('../authorization/auth');
const user = require('../entity/user');

const router = express.Router();


router.get('/search', auth, (request, response) => {
    if(typeof request.query.email != 'undefined'){
        user.find({email: request.query.email})
        .select('-password')
        .then(user => {
            if(user.length==0){
                response.status(404).json({success: false, msg: "user not found"});
            }
            else {
                response.json(user);
            }
            
        })
        .catch(error => response.status(500).json({ success: false, msg: error }))
    }
    else{
        response.status(400).json({ success: false, msg: "invalid search"})
    }
    
});

router.post('/',(request, response) => {
    const {firstName, lastName, email, password} = request.body;
    if(!firstName || !email || !password) {
        return response.status(400).json({success: false, msg: "bad request"});
    }
    user.findOne({email})
        .then(user=> {
            if(user){
                return response.status(400).json({success: false, msg: "user already exists"});
            }
            else {
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            newUser.password = hash;
                        }
                        newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user.id, name: user.email, firstName: user.firstName, lastName: user.lastName},
                                config.secret,
                                {expiresIn: config.tokenExpire},
                                (err, token) => {
                                    if(err){
                                        throw err;
                                    }
                                    else {
                                        response.json({success: true, token, user: {id: user.id, firstName: user.firstName, lastName: user.lastName}});
                                    }
                                }
                            )
                        })
                        .catch(error => resonse.status(500).json({success: false, msg: error}));
                    });
                });
            }
        })
    
    
});


module.exports = router;