const Joi = require('joi');

const joiUserSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(50).required(),
    mobile: Joi.string().regex(/^[0-9]{10}$/).required().messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
    password: Joi.string().min(5).max(255).required()
});

//function to validate user 
function validateUser(req, res, next) {
    const user = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    }
    
    const {error} = joiUserSchema.validate(user);
    if(error){
        res.status(406);
        return res.render('error', { message: error.details[0].message })
    } else{
        req.validatedUser = user;
        next();
    }
}

module.exports = validateUser;