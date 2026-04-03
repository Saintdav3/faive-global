const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { uploadBufferToCloudinary } = require('../utils/cloudinaryUpload');
const { isDbReady } = require('../utils/dbAvailability');

const normalizeMetrics = (metrics) => {
  if (!metrics) {
    return [];
  }

  if (Array.isArray(metrics)) {
    return metrics;
  }

  try {
    return JSON.parse(metrics);
  } catch (error) {
    return [];
  }
};

const normalizeGallery = (gallery) => {
  if (!gallery) {
    return [];
  }

  if (Array.isArray(gallery)) {
    return gallery;
  }

  try {
    return JSON.parse(gallery);
  } catch (error) {
    return [];
  }
};

const normalizeServices = (services) => {
  if (!services) {
    return [];
  }

  if (Array.isArray(services)) {
    return services;
  }

  try {
    return JSON.parse(services);
  } catch (error) {
    return String(services)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const normalizeDeliverables = (deliverables) => {
  if (!deliverables) {
    return [];
  }

  if (Array.isArray(deliverables)) {
    return deliverables.map((item) => String(item).trim()).filter(Boolean);
  }

  try {
    const parsed = JSON.parse(deliverables);
    return Array.isArray(parsed)
      ? parsed.map((item) => String(item).trim()).filter(Boolean)
      : [];
  } catch (error) {
    return String(deliverables)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const getPortfolios = asyncHandler(async (req, res) => {
  if (!isDbReady(req)) {
    res.json({ success: true, count: 0, data: [] });
    return;
  }

  const query = {};

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.featured) {
    query.featured = req.query.featured === 'true';
  }

  const portfolios = await Portfolio.find(query)
    .populate('services', 'name slug')
    .sort({ featured: -1, createdAt: -1 });

  res.json({ success: true, count: portfolios.length, data: portfolios });
});

const getPortfolioById = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id).populate('services');

  if (!portfolio) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  res.json({ success: true, data: portfolio });
});

const createPortfolio = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    metrics: normalizeMetrics(req.body.metrics),
    mediaGallery: normalizeGallery(req.body.mediaGallery),
    services: normalizeServices(req.body.services),
    deliverables: normalizeDeliverables(req.body.deliverables)
  };

  if (req.file) {
    const upload = await uploadBufferToCloudinary(req.file.buffer, 'faive-global/portfolio');
    payload.heroMediaUrl = upload.secure_url;
  }

  const portfolio = await Portfolio.create(payload);
  const populatedPortfolio = await portfolio.populate(['services']);

  res.status(201).json({ success: true, data: populatedPortfolio });
});

const updatePortfolio = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body
  };

  if (req.body.metrics) {
    payload.metrics = normalizeMetrics(req.body.metrics);
  }

  if (req.body.mediaGallery) {
    payload.mediaGallery = normalizeGallery(req.body.mediaGallery);
  }

  if (req.body.services) {
    payload.services = normalizeServices(req.body.services);
  }

  if (req.body.deliverables !== undefined) {
    payload.deliverables = normalizeDeliverables(req.body.deliverables);
  }

  if (req.file) {
    const upload = await uploadBufferToCloudinary(req.file.buffer, 'faive-global/portfolio');
    payload.heroMediaUrl = upload.secure_url;
  }

  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true
  })
    .populate('services');

  if (!portfolio) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  res.json({ success: true, data: portfolio });
});

const deletePortfolio = asyncHandler(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolio) {
    throw new ApiError(404, 'Portfolio item not found');
  }

  res.json({ success: true, message: 'Portfolio item deleted successfully' });
});

const uploadPortfolioMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Media file is required');
  }

  const upload = await uploadBufferToCloudinary(req.file.buffer, 'faive-global/media');
  res.status(201).json({
    success: true,
    data: {
      url: upload.secure_url,
      resourceType: upload.resource_type === 'video' ? 'video' : 'image'
    }
  });
});

module.exports = {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  uploadPortfolioMedia
};
