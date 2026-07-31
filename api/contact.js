const nodemailer = require('nodemailer');

const esc = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const nl2br = (str = '') => esc(str).replace(/\n/g, '<br/>');

const BASE_STYLES = `
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f4efe6; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(12,12,12,0.10); }
  .email-header { background: #0c0c0c; padding: 28px 40px; }
  .brand { color: #fad201; font-size: 20px; font-weight: 700; letter-spacing: 0.06em; text-decoration: none; }
  .content { padding: 40px; }
  h2 { margin-top: 0; color: #0c0c0c; font-size: 22px; font-weight: 700; }
  .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #6c6a64; margin: 0 0 4px; }
  .value { font-size: 15px; color: #1b1b1b; margin: 0 0 22px; }
  .value a { color: #f19f1a; text-decoration: none; }
  .message-box { background: #f4efe6; border-radius: 12px; padding: 20px 24px; font-size: 15px; line-height: 1.7; color: #1b1b1b; margin-top: 6px; }
  .divider { border: none; border-top: 1px solid rgba(12,12,12,0.08); margin: 28px 0; }
  .email-footer { background: #0c0c0c; padding: 18px 40px; color: #6c6a64; font-size: 12px; }
  .email-footer a { color: #fad201; text-decoration: none; }
`;

const buildEmailHtml = (data) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><style>${BASE_STYLES}</style></head>
<body>
  <div class="wrapper">
    <div class="email-header"><span class="brand">Fainna / Faive Global</span></div>
    <div class="content">
      <h2>New Contact Message</h2>
      <p class="label">Name</p><p class="value">${esc(data.fullName)}</p>
      <p class="label">Email</p><p class="value"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></p>
      ${data.company ? `<p class="label">Company</p><p class="value">${esc(data.company)}</p>` : ''}
      ${data.subject ? `<p class="label">Service Needed</p><p class="value">${esc(data.subject)}</p>` : ''}
      ${data.budget ? `<p class="label">Budget</p><p class="value">${esc(data.budget)}</p>` : ''}
      <hr class="divider"/>
      <p class="label">Message</p>
      <div class="message-box">${nl2br(data.message)}</div>
    </div>
    <div class="email-footer">
      Faive Global &mdash; <a href="mailto:hello@faiveglobal.ltd">hello@faiveglobal.ltd</a>
    </div>
  </div>
</body>
</html>
`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  const { fullName, email, company, subject, budget, message } = req.body || {};

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || `"Faive Global" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${subject || 'General Enquiry'} — ${fullName}`,
      html: buildEmailHtml({ fullName, email, company, subject, budget, message }),
    });

    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[Contact] Email error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please email hello@faiveglobal.ltd directly.',
    });
  }
};
