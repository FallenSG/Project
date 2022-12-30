const router = require('express').Router();
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

const { auth } = require('../middleware/authHandler')

const { Direct, renderType } = require('../routePlan');
const { renderFilePath, redirectUrl } = Direct(path="reset", failure="signIn");

router.use(auth);

router.get('/', async(req, res) => {
    res[renderType](renderFilePath);
})

router.post('/', async(req, res) => {
    bcrypt.compare(req.body.oldPass, req.user.password, (err, isValid) => {
        if(err) 
            return res.redirect(redirectUrl);
        if(!isValid)
            return res.status(400).send("Wrong Credentials");
        User.findOneAndUpdate({ _id: req.user._id }, { 
            $set: { password: req.body.newPass }
        }).then( data => res.status(200).send("Password Updated...") )
            .catch(err => res.status(401).send("Error"))
    })
})

module.exports = router