import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  /////////////////////////////////////////////////
  tls: {
    rejectUnauthorized: false, // A RETIRER EN PROD : Désactive la vérification stricte des certificats
  },
});

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error;
  }
};

export default sendEmail;
