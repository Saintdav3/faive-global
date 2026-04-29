const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = ({ from, to, replyTo, subject, html, attachments }) =>
  transporter.sendMail({
    from: from || process.env.FROM_EMAIL || `"Faive Global" <${process.env.SMTP_USER}>`,
    to: to || process.env.TO_EMAIL,
    replyTo,
    subject,
    html,
    attachments,
  });

module.exports = { sendEmail };
