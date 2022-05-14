const express = require('express');
const asyncHandler = require('express-async-handler');
const userService = require('../service/users.service');
const auth = require('../authorization/auth');
const User = require('../entity/user');

const router = express.Router();


router.get('/search', auth, (request, response) => {
    if (typeof request.query.email != 'undefined') {
        User.find({ email: request.query.email })
            .select('-password')
            .then(user => {
                if (user.length == 0) {
                    response.status(404).json({ success: false, msg: "user not found" });
                }
                else {
                    response.json(user);
                }

            })
            .catch(error => response.status(500).json({ success: false, msg: error }))
    }
    else {
        response.status(400).json({ success: false, msg: "invalid search" })
    }

});

router.post('/', asyncHandler(async (req, res) => {
   try{
    const newUser = await userService.createUser(req.body);
    res.status(201).send(
        { success: true, 
        status:newUser.status,
        name:newUser.name,
        lastName:newUser.lastName,
        token:newUser.token});}
    catch(err){
        res.status(400).send({error:"some field is missing"})
    }


}))


module.exports = router;
