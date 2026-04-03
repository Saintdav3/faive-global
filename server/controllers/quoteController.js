const QuoteRequest = require('../models/QuoteRequest');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const transporter = require('../config/mail');
const {
  buildAdminLeadNotification,
  buildClientConfirmation
} = require('../utils/emailTemplates');
const { uploadBufferToCloudinary } = require('../utils/cloudinaryUpload');
const { isDbReady } = require('../utils/dbAvailability');

const getQuotes = asyncHandler(async (req, res) => {
  if (!isDbReady(req)) {
    res.json({ success: true, count: 0, data: [] });
    return;
  }

  const quotes = await QuoteRequest.find()
    .populate('serviceInterest', 'name slug')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: quotes.length, data: quotes });
});

const getQuoteById = asyncHandler(async (req, res) => {
  const quote = await QuoteRequest.findById(req.params.id).populate('serviceInterest', 'name slug');
  if (!quote) {
    throw new ApiError(404, 'Quote request not found');
  }

  res.json({ success: true, data: quote });
});

const createQuote = asyncHandler(async (req, res) => {
  const attachments = [];

  if (Array.isArray(req.files) && req.files.length) {
    for (const file of req.files) {
      const upload = await uploadBufferToCloudinary(file.buffer, 'faive-global/quotes');
      attachments.push(upload.secure_url);
    }
  }

  const quote = await QuoteRequest.create({
    ...req.body,
    regions: req.body.regions
      ? Array.isArray(req.body.regions)
        ? req.body.regions
        : String(req.body.regions)
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
      : [],
    attachments
  });

  const populatedQuote = await quote.populate('serviceInterest', 'name');

  const adminEmail = buildAdminLeadNotification({
    subject: 'New quote request received',
    intro: 'A new quote request has been submitted through the Faive Global platform.',
    payload: [
      { label: 'Client', value: quote.fullName },
      { label: 'Email', value: quote.email },
      { label: 'Company', value: quote.company || 'N/A' },
      { label: 'Project Type', value: quote.projectType },
      { label: 'Videos', value: quote.deliverablesCount || 'Not specified' },
      { label: 'Budget', value: quote.budgetRange || 'Undisclosed' }
    ]
  });

  const clientEmail = buildClientConfirmation({
    name: quote.fullName,
    projectType: quote.projectType
  });

  await Promise.allSettled([
    transporter.sendMail({
      to: process.env.AGENCY_EMAIL,
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      subject: adminEmail.subject,
      html: adminEmail.html
    }),
    transporter.sendMail({
      to: quote.email,
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      subject: clientEmail.subject,
      html: clientEmail.html
    })
  ]);

  res.status(201).json({ success: true, data: populatedQuote });
});

const updateQuote = asyncHandler(async (req, res) => {
  const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('serviceInterest', 'name slug');

  if (!quote) {
    throw new ApiError(404, 'Quote request not found');
  }

  res.json({ success: true, data: quote });
});

const deleteQuote = asyncHandler(async (req, res) => {
  const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
  if (!quote) {
    throw new ApiError(404, 'Quote request not found');
  }

  res.json({ success: true, message: 'Quote request deleted successfully' });
});

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
};
