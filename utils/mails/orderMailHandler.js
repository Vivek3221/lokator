const path = require('path'); 
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    sendOrderMailBySMTP:(to, subject, html) => {
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
            from: 'Loketor Pvt Ltd <support@lokator360.com>',
            to: to,
            subject: subject,
            text: 'It is realy working',
            template:'order',
            context: {
                name:'vivek singh',
                inquiryBody:`'<tr cellspacing="0"
                cellpadding="0"
                style="border-top:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2;padding:0px 0px 10px 0px"
                valign="top">
                <td colspan="3"
                    style="font-family:'sofia',Helvetica,Arial,sans-serif;color:inherit;font-size:16px;font-weight:normal;text-align:left;padding-left:10px;padding-bottom:0px;padding-top:10px;border-bottom:1px solid #efefef">
                    wheel
                    loader
                    shovel(Komatsu
                    WA430)


                </td>
                <td
                    style="font-family:'sofia',Helvetica,Arial,sans-serif;color:#343434;font-size:16px;font-weight:normal;text-align:right;padding-right:10px;padding-top:10px;padding-bottom:10px;border-bottom:1px solid #efefef">
                    1
                </td>
                <td
                    style="font-family:'sofia',Helvetica,Arial,sans-serif;color:#343434;font-size:16px;font-weight:normal;text-align:right;padding-right:10px;padding-top:10px;padding-bottom:10px;border-bottom:1px solid #efefef">
                    2022-02-07
                </td>
                <td
                    style="font-family:'sofia',Helvetica,Arial,sans-serif;color:#343434;font-size:16px;font-weight:normal;text-align:right;padding-right:10px;padding-top:10px;padding-bottom:10px;border-bottom:1px solid #efefef">
                    monthly
                </td>

            </tr>'`
            }
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