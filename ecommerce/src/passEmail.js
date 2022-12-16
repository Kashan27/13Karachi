
const authModel = require('../Model/signupschema');
const postModel = require('../Model/postSchema');
const bookingModel = require('../Model/bookingSchema')
const mailgun = require("mailgun-js");
var nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");








const resetPassword = async (req, res) => {

    let { email } = req.body
    const checkUser = await authModel.findOne({ email: email })
    let code = Math.floor(Math.random() * 899999 + 100000);
    // console.log(email,"email")
    // console.log(checkUser,"user")
    console.log(email, "email")
    if (checkUser) {

        let transporter = nodemailer.createTransport({
            // host: 'smtp-relay.sendinblue.com',
            // port:587,
            service: "gmail",
            auth: {
                user: 'muhammadkashan267@gmail.com',
                pass: 'mjcsadssovtnwesx'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        var mailOptions = {
            from: '13Karachi@gmail.com',
            to: email,
            subject: 'Password Reset Email',
            text: `This is your reset code ${code}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send({ success: false, message: "Something went wrong Contact with admin" })
            } else {
                res.send({ success: true, message: "Code sent! check your email", code })
                console.log('Email sent: ' + info.response);
            }
        })

    } else {
        res.send({ success: false, message: "email not found" })
    }

}


const updatePassword = async (req, res) => {

    try {
        let { email, password } = req.body
        const hastPass = await bcrypt.hash(password, 12);
        console.log(hastPass,"pass")
        const updateDoc = {
            $set: {
                pass: hastPass
            },
        };
        const updateUser = await authModel.updateOne({ email: email }, updateDoc )
        console.log(updateUser,"updateUser")
        res.status = 200
        res.send({ success: true, message: "Password successfully updated" })
    } catch (error) {
        res.status = 400
        res.send({ success: false, message: error.message })
    }
}


module.exports = { resetPassword , updatePassword};


