const express = require('express');
const asyncHandler = require('express-async-handler');
const userService = require('../service/users.service');
const auth = require('../authorization/auth');
const User = require('../entity/user');

const router = express.Router();


router.get('/:email/', auth, asyncHandler(async (req, res) => {
    const index = req.params['email'];
    const result = await userService.getUser(index);
    res.send(result);

}));

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
