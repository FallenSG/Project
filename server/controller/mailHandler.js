const nodemailer = require('nodemailer');
const config = require('dotenv').config().parsed
const forgotPass = require('../models/forgotPass');

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
        <a href=http://${config.DOMAIN}/verify/${token}> Click here</a>
        </div>`


        return {
            mailBody: { subject, html },
            resp: "A Verification link is sent to mail"
        }
    },

    "Reset": async (username, email) => {
        const uniqStr = uniqString()
        const token = jwt.sign({ email, uniqStr }, config.SECRET);

        const data = new forgotPass({
            email, token
        });

        data.save();

        const subject = "Forgot Password"
        const html = `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>It Seems you have forgotten your password to reset it please click on the following link.</p>
        <a href=http://${config.DOMAIN}/forgot-password/${token}> Click here</a>
        </div>`

        return {
            mailBody: { subject, html },
            resp: "Password reset link has been sent to your email.."
        }
    }
}

module.exports = async function (username, recvMail, type = 'Confirm') {
    return new Promise(async (resolve, reject) => {

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.EMAIL_ID,
                pass: config.EMAIL_PASS
            }
        });

        const response = await respType[type](username, recvMail);

        var mailOptions = {
            from: config.EMAIL_ID,
            to: recvMail,
            ...response['mailBody']
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                resolve({
                    code: 503,
                    msg: "An Error occured. Please try again after sometime!!"
                });
            } else {
                resolve({
                    code: 200,
                    msg: response.resp
                });
            }
        });
    })
}

