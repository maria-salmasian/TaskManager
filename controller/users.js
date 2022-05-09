const express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const config = require('../common/config/config');
const auth = require ('../authorization/auth');
const User = require('../entity/user');

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
    const {name, lastName, email, password} = request.body;
    if(!name || !email || !password) {
        return response.status(400).json({success: false, msg: "bad request"});
    }
    User.findOne({email})
        .then(user=> {
            if(user){
                return response.status(400).json({success: false, msg: "user already exists"});
            }
            else {
                const newUser = new User({
                    name,
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
                        .catch(error => resonse.status(500).json({success: false, msg: error}));
                    });
                });
            }
        })
    
    
});


module.exports = router;
