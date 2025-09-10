import nodemailer from 'nodemailer';

//Objeto de transporte de correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})


//

export default transporter;