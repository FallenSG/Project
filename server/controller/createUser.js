const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async function(req, res){
    const validUser = req.validatedUser;

    let user = await User.findOne({ $or: [
        { email: validUser.email },
        { mobile: validUser.mobile }
    ]});

    if (user) return res.status(400).render('error', { message: "User Already Exists" });
    
    user = new User(validUser);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.send({ msg: "User created" });
}
