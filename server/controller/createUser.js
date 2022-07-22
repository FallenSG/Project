const User = require('../models/user');
const Joi = require('joi');

//Valdation schema
const joiUserSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    mobile: Joi.string().regex(/^[0-9]{10}$/).required().messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    password: Joi.string().min(5).max(255).required(),
    lib: Joi.array().items(),
    book_id: Joi.array().items(),
});

//create User after validation returns true.
async function createUser(req, res){

    let user = new User(req.validatedUser);
    await user.save();

    res.send({ msg: "User created" });
}

//takes data posted and form it in a readable format
//then validate/sanitize it against schema
//if error arises or user already exists a msg is passed on
//else user creation process is executed 
module.exports = async function(req, res){
    let user = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        lib: [],
        book_id: []
    }

    const { err } = joiUserSchema.validate(user);
    if (err) {
        res.status(406);
        return res.render('error', { message: err.details[0].message })
    } else {
        const ExistUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        });

        if (ExistUser) return res.status(400).render('error', { message: "User Already Exists" });

        req.validatedUser = user;
        createUser(req, res);
    }
}
