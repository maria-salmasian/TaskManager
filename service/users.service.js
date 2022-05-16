const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const NotFoundError = require('../common/errors/not-found.error');
const UnauthorizedError = require('../common/errors/unauthorized.error');

const config = require('../common/config/config');
const User = require('../entity/user');
module.exports = {
    async createUser(body){
        const { name, lastName, email, password } = body;
        if (!name || !email || !password||!lastName) {
            throw new NotFoundError('some field is missing')
        }
        const message = 'User already exists';
        const user = await User.findOne({email});
        if(user){
            throw new UnauthorizedError(message);

        }
            const newUser = new User({
                name,
                lastName,
                email,
                password,
            });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        const token = jwt.sign(
            {newUser},
            config.secret,
            {
              expiresIn: config.tokenExpire,
            }
          );
        newUser.token = token;
        return newUser.save();
        
    },
    async getUser(email){
        const user = await User.find({email:email});
        if (!user) {
            throw new NotFoundError(`User with email = ${email} is not found!`);
        }

        return student;
    }
}

