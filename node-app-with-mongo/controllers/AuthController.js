const { Validator } = require('node-input-validator');
const niv = require('node-input-validator');
const helpers = require('../helpers/helper')
const response = require('../send_response')

let userSchema = require('../models/user');

const bcrypt = require('bcryptjs');

exports.signup = function (req, res) {
    niv.addCustomMessages({
        'password.minLength': 'The password must be at least 3 characters.',
    });
    const v = new Validator(req.body, {
        email: 'required|email',
        username: 'required',
        password: "required|string|minLength:3|same:confirm_password",
    });

    v.check().then(async (matched) => {
        if (!matched) {
            return res.status(422).send(response.send_error(v.errors));
        } else {
            try {
                const exist_user = await userSchema.findOne({ email: req.body.email });
                if (exist_user) {
                    return res.status(200).send(response.send_error("Email Already Exist!"));
                }
                const user = await userSchema.create({
                    "username": req.body.username,
                    "email": req.body.email,
                    "status": 'active',
                    "password": bcrypt.hashSync(req.body.password, 8),
                });

                var token = helpers.generateAccessToken(user)
                let tok = { token: token }
                obj = { ...user._doc, ...tok }
                return res.status(200).send(
                    response.send_success("Data inserted successfully!", obj)
                );
            } catch (error) {
                console.log(error)
                return res.status(422).send(response.send_error(error));
            }
        }
    });
};

exports.signin = function (req, res) {
    const v = new Validator(req.body, {
        username: 'required',
        password: 'required'
    });
    v.check().then(async (matched) => {
        if (!matched) {
            return res.status(422).send(response.send_error(v.errors));
        } else {
            try {
                console.log('body', req.body)
                const user = await userSchema.findOne({ username: req.body.username });
                console.log('user details', user)
                if (user) {
                    const match = bcrypt.compareSync(req.body.password, user.password); // true
                    if(match){
                        var token = helpers.generateAccessToken(user)
                        let tok = { token: token }
                        obj = { ...user._doc, ...tok }

                        return res.status(200).send(
                            response.send_success("User Log In successfully!", obj)
                        )
                    } else {
                        res.status(200).send(
                            response.send_error("Wrong Password!")
                        );
                    }
                } else {
                    res.status(422).send(
                        response.send_error("Invalid credentials!"),
                    );
                }
            } catch (error) {
                return res.status(200).send(response.send_error(error));
            }
        }
    })
};

exports.signout = function (req, res)  {
    try {
        req.session = null;
        return res.status(200).send(
            response.send_success("You've been signed out!")
        )
    } catch (err) {
        this.next(err);
    }
};

exports.users = function (req, res) {
    userSchema.find((error, data) => {
        if (error) {
            return res.status(422).send(response.send_error(error));
        } else {
            return res.status(200).send(
                response.send_success("User Get successfully!", data)
            )
        }
    })
}