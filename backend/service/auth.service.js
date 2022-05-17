const User = require('../entity/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../common/config/config');

module.exports = {
    async login(body){
        const { email, password } = body;
        if (!email || !password) {
            throw new NotFoundError("Email or password are missing");
        }
        const user = await User.findOne({email});
        if(!user){
            throw new NotFoundError("This user doesn't exist")
        }
        if (await bcrypt.compare(password, user.password)) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              config.secret,
              {
                expiresIn: config.tokenExpire,
              }
            );
            user.token = token;
            return user;
    }
}
}