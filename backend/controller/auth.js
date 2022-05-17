const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../service/auth.service');
const asyncHandler = require('express-async-handler');


const config = require('../common/config/config');


router.get('/verifytoken', (request, response) => {
    const token = request.header('x-auth-token');

    if (!token) {
        return response.status(401).json({ success: false, msg: "unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        const user = decoded;
        response.json({ success: true, token, id: user.id, name: user.name, lastName: user.lastName });
    } catch (exception) {
        response.status(401).json({ success: false, msg: "invalid token" + exception });
    }
});


router.post('/', asyncHandler(async (req, res) => {
    try {
        const user = await authService.login(req.body);
        res.send({
            name: user.name,
            lastName: user.lastName,
            token: user.token
        });
    }
    catch (err) {
        res.status(405).send({ error: "bad request:unauthorized" })
    }
}));

module.exports = router;