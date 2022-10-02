const path = require('path'); 
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    sendNewPasswordMailBySMTP:(to, subject, userData) => {
        let transporter = nodemailer.createTransport({
            host: process.env.AWS_SES_HOST,
            port: process.env.AWS_SES_PORT,
            auth: {
                user: process.env.AWS_SES_CLIENT_ID,
                pass: process.env.AWS_SES_CLIENT_SECRET_KEY
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extName:".html",
                partialsDir: path.resolve('./views'),
                defaultLayout: false
            },
            viewPath: path.resolve('./views/MailTemplates/'),
            extName: ".handlebars"
        }

        transporter.use('compile', hbs(handlebarOptions));

        let mailContent = {
            from: `Lokator Pvt Ltd ${process.env.AWS_SES_CLIENT_ID}`,
            to: to,
            subject: subject,
            template:'forgot-password',
            context: userData
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