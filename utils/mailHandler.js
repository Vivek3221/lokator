const nodemailer = require("nodemailer");

module.exports = {
    sendMailBySMTP:(to, subject, html) => {
        let transporter = nodemailer.createTransport({
            host: process.env.AWS_SES_HOST,
            port: process.env.AWS_SES_PORT,
            auth: {
                user: process.env.AWS_SES_CLIENT_ID,
                pass: process.env.AWS_SES_CLIENT_SECRET_KEY
            }
        });
        let mailContent = {
            from: 'Loketor Pvt Ltd <support@lokator360.com>',
            to: to,
            subject: subject,
            html: html
        };
        transporter.sendMail(mailContent, function (err, data) {
            if (err) {
                console.log('Unable to send mail Err: ' + err.message);
            } else {
                console.log('Email send successfully');
            }
        });
    }
    
}