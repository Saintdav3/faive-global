const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isDbReady } = require('../utils/dbAvailability');

const getServices = asyncHandler(async (req, res) => {
  if (!isDbReady(req)) {
    res.json({ success: true, count: 0, data: [] });
    return;
  }

  const services = await Service.find().sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, count: services.length, data: services });
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.json({ success: true, data: service });
});

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.json({ success: true, data: service });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.json({ success: true, message: 'Service deleted successfully' });
});

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
