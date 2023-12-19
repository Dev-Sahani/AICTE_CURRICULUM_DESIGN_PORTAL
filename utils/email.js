const nodemailer = require('nodemailer')

const getTransporter = ()=>nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your Gmail address
        pass: "Daksh@8123", // Your Gmail password or App Password
    },
});

// Function to send an email
exports.sendEmailToUser = async function (user) {
    // Create a transporter using Gmail service
    const transporter = getTransporter()

    // Email content
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: user.email, // Receiver email address
        subject: 'Credentials Information',
        text: `Your login credentials:
        \t\tUserId: ${user.userId}
        \t\t Password: ${user.password}\n
        please login here "https://aicte-curriculum-portal.onrender.com/api/v1/auth/login"`,
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
}
exports.sendOTP = async function (email,otp) {
    // Create a transporter using Gmail service
    const transporter = getTransporter()

    // Email content
    const mailOptions = {
        from: process.env.EMAIL, // Sender email address
        to: email, // Receiver email address
        subject: 'Credentials Information',
        text: `Your otp : ${otp} \n
        for registering to "https://aicte-curriculum-portal.onrender.com/api/v1/auth/register"`,
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
}

