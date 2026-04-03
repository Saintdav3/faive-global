const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const transporter = require('../config/mail');
const { buildAdminLeadNotification } = require('../utils/emailTemplates');
const { isDbReady } = require('../utils/dbAvailability');

const getContacts = asyncHandler(async (req, res) => {
  if (!isDbReady(req)) {
    res.json({ success: true, count: 0, data: [] });
    return;
  }

  const contacts = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, data: contacts });
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await ContactMessage.findById(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact message not found');
  }

  res.json({ success: true, data: contact });
});

const createContact = asyncHandler(async (req, res) => {
  const contact = await ContactMessage.create(req.body);

  const adminEmail = buildAdminLeadNotification({
    subject: 'New contact message received',
    intro: 'A new contact message has been submitted through the Faive Global website.',
    payload: [
      { label: 'Name', value: contact.fullName },
      { label: 'Email', value: contact.email },
      { label: 'Company', value: contact.company || 'N/A' },
      { label: 'Service', value: contact.subject },
      { label: 'Budget', value: contact.budget || 'Not specified' }
    ]
  });

  await Promise.allSettled([
    transporter.sendMail({
      to: process.env.AGENCY_EMAIL,
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      subject: adminEmail.subject,
      html: adminEmail.html
    })
  ]);

  res.status(201).json({ success: true, data: contact });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!contact) {
    throw new ApiError(404, 'Contact message not found');
  }

  res.json({ success: true, data: contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!contact) {
    throw new ApiError(404, 'Contact message not found');
  }

  res.json({ success: true, message: 'Contact message deleted successfully' });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
