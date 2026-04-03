const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    resourceType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    altText: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const metricSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ],
    heroMediaUrl: {
      type: String,
      required: true
    },
    mediaGallery: {
      type: [mediaSchema],
      default: []
    },
    campaignGoal: {
      type: String,
      required: true
    },
    concept: {
      type: String,
      trim: true
    },
    strategy: {
      type: String,
      trim: true
    },
    resultsSummary: {
      type: String,
      required: true
    },
    metrics: {
      type: [metricSchema],
      default: []
    },
    deliverables: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
