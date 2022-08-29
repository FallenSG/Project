const nodemailer = require('nodemailer');
const config = require('dotenv').config().parsed

const jwt = require('jsonwebtoken');

function uniqString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 30; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    return token;
}

const respType = {
    "Confirm": (username, email) => {
        const uniqStr = uniqString()
        const token = jwt.sign({ email, uniqStr }, config.SECRET);
        
        const subject = "Email Verification"
        const html = `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://${config.HOST}:${config.PORT}/verify/${token}> Click here</a>
        </div>`
        
        return { subject, html }
    },
    
    "Reset": (username, email) => {
        const uniqStr = uniqString()
        const token = jwt.sign({ email, uniqStr }, config.SECRET, {
            expiresIn: '1h'
        });
        
        const subject = "Forgot Password"
        const html = `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>It Seems you have forgotten your password to reset it please click on the following link.</p>
        <a href=http://${config.HOST}:${config.PORT}/forgot-password/${token}> Click here</a>
        </div>`
        
        return { subject, html }
    }
}

module.exports = async function(username, recvMail, type='Confirm') {

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: config.EMAIL_ID,
            pass: config.EMAIL_PASS
        }
    });

    const resp = respType[type](username, recvMail);

    var mailOptions = {
        from: config.EMAIL_ID,
        to: recvMail,
        ...resp
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error); //same here logger
        // else console.log('Message sent: %s', info.messageId); change it with logger
    })

}
