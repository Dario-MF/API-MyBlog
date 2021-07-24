const nodemailer = require('nodemailer');



const sendMail = async (email, subject, contentHTML) => {
    try {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: 'smtp-mail.outlook.com',
            secureConnection: false,
            port: 587,
            secure: false,
            auth: {
                user: process.env.OUTLOOK_MAIL,
                pass: process.env.OUTLOOK_PASSWORD
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: `MyBlog <${process.env.OUTLOOK_MAIL}>`,
            to: email,
            subject,
            html: contentHTML
        };

        const result = await transporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    };
};

const getTemplate = (name, code) => {
    return `
        <div id="email___content">   
            <h3>Hola ${name}</h3>
            <h2>Bienvenido a MyBlog</h2>   
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:8000/api/users/confirm/${code}"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `;
}




module.exports = {
    sendMail,
    getTemplate
};