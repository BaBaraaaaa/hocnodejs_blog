
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose.js');
const User = require('../models/User.js');
const Role = require('../models/Role.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('../../util/generalToken.js');
class AuthController {
    //[GET]/signIn
    signIn(req, res, next) {
        res.render('auth/login');
    }
    //[POST] /signIn
    async handleSignIn(req, res, next) {
        console.log(req.body.email);
        const { email, password } = req.body;

        await User.findOne({ email })
            .then(async user => {
                const isUser = await user.comparePassword(password);
                if (!user || !isUser) {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
                else {
                    const access_token = generalAccessToken(user);

                    const refresh_token = generalRefreshToken(user);

                    res.cookie('token', token)
                        .status(200)
                        .json({ status: 200, access_token, refresh_token });
                    
                }
            })
            .catch(next);
    }
    //[GET]/regiser
    register(req, res, next) {
        res.render('auth/register');
    }
    //[POST] /regiser   
    async handleResgister(req, res, next) {
        const { email, username, password } = req.body;
        const role_id = await Role.findOne({ name: 'User' })
            .then(role => {
                return role._id;
            });
        const user = new User({ email, username, password, role_id });
        const existingUser = await User.findOne({ email });
        if (existingUser) { res.json({ message: 'Email already exists' }); return; }
        user.password = await bcrypt.hashSync(password, 10);

        await user.save()
            .then(user => {
                Role.findById({ _id: user.role_id })
                    .then(role => {
                        res.json(role.permissions);
                    });
                if (user) {

                    res.status(201).json(user);
                }
            })


    }
}

module.exports = new AuthController();