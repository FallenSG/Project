const { User, JoiValidUser } = require('../models/user');
const mailer = require('./mailHandler')

//takes data posted and form it in a readable format
//then validate/sanitize it against schema
//if error arises or user already exists a msg is passed on
//else user creation process is executed 
module.exports = async function(req, res){
    let user = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    }

    try{
        JoiValidUser.validate(user);

        const ExistUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        });

        if(ExistUser) 
            throw new Error("Email/Mobile Number already Registered");

        await (new User(user)).save();

        const resp = await mailer(user.username, user.email);
        res.send({ msg: resp });
        
    } catch(err) {
        // res.render('error', { message: err.message })
        res.send({msg: err.message})
    }
}
