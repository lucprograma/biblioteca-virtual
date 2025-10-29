import transporter from './nodemailer.js'

function mailServiceStatus() {
    transporter.verify()
    .then(() => {
    console.log("📨 Mail service connected succesfully!")
    })
    .catch((err) => {
    console.error("🔌 Error to connect with the mail service!\n", err)
    });
}

export default mailServiceStatus;