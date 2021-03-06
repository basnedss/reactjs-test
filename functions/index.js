const functions = require('firebase-functions');

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors');
admin.initializeApp();

/**
 * CORS handler function to enable cross-platform resource sharing on the API. This algorithm has been adapted from
 * DiagoParceiro (https://stackoverflow.com/a/65127649/5590363)
 * @param request -- the request handler
 * @param response -- the response handler
 * @param handler -- the callback handler function.
 */
const corsHandler = (request, response, handler) => {
    cors({origin: true})(request, response, async () => {
        try {
            await handler();
        } catch (e) {
            functions.logger.error('Error: ' + e);
            response.statusCode = 500;
            response.send({
                'status': 'ERROR' //Optional: customize your error message here
            });
        }
    });
};


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "medcast.testing@gmail.com", // replace with your Mailtrap credentials
        pass: "MedCast123!"
    },
    debug: true, // show debug output
    logger: true // log information in console
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendEmail = functions.https.onRequest((request, response) => {

    corsHandler(request, response, () => {
        // getting dest email by query string
        const dest = "sajid.erc@gmail.com";

        const mailOptions = {
            from: "info@soombros.com", // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'EMAIL FROM FIREBASE', // email subject
            html: `<p style="font-size: 16px;">Hello Ada Sajid!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            console.log(info);
            if(erro){
                return response.send(erro.toString());
            }
            return response.send("Sent");
        });
    })
})
