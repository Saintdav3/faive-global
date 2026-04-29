const { contactEmailHtml } = require('../utils/emailTemplates');
const { sendEmail } = require('../utils/mailer');

const submitContact = async (req, res) => {
  const { fullName, email, company, subject, budget, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.',
    });
  }

  try {
    const info = await sendEmail({
      replyTo: email,
      subject: `New Contact: ${subject || 'General Enquiry'} — ${fullName}`,
      html: contactEmailHtml({ fullName, email, company, subject, budget, message }),
    });

    console.log('[Contact] Email sent:', info.messageId);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('[Contact] Unexpected error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or email hello@faiveglobal.ltd.',
    });
  }
};

module.exports = { submitContact };
