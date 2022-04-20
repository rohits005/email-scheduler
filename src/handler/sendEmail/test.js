const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require("express");
const app = express();
const PORT = 8080;

let nodemailer = require('nodemailer');

// const sendEmail = require("./sendEmail");
const HTTP_CODE = require('../../common/utils/constants');
const responder = require('../../common/utils/responder');

app.post("/send-email",(request, response) => {
     // e-mail message options

    console.log(process.env.SENDER_EMAIL, process.env.SENDER_EMAIL_PASSWORD);
     let mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIEVER_EMAIL,
        subject: 'Hello, Greetings! This is a Test Message.',
        text: 'Hi, Greetings! Tresponsehis email is sent for Testing Purpose. Please ignore'
    };

    // e-mail transport configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD
        }
    });

    // Send e-mail
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
    } else {
            console.log('Email sent: ', info.response);
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, info.response, 'Email sent successfully', response);
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});






// SCHEDULERS

// let cron = require('node-cron');
// let nodemailer = require('nodemailer');

// // e-mail message options
// let mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: process.env.RECIEVER_EMAIL,
//       subject: 'Hello, Greetings! This is a Test Message.',
//       text: 'Hi, Greetings! This email is sent for Testing Purpose. Please ignore'
//  };

// // e-mail transport configuration
// let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_EMAIL_PASSWORD
//       }
//   });

// cron.schedule('* * * * *', () => {
// // Send e-mail
// transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//   });
// });
