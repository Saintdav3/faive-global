const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    company: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    deliverablesCount: {
      type: String,
      trim: true
    },
    serviceInterest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    projectType: {
      type: String,
      required: true,
      trim: true
    },
    budgetRange: {
      type: String,
      trim: true
    },
    targetLaunchDate: {
      type: String,
      trim: true
    },
    regions: {
      type: [String],
      default: []
    },
    projectBrief: {
      type: String,
      required: true
    },
    attachments: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['new', 'in_review', 'qualified', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuoteRequest', quoteRequestSchema);
