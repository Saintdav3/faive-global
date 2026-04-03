const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { isDbReady } = require('../utils/dbAvailability');

const getCookieValue = (cookieHeader, key) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${key}=`));
  return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
};

const getRequestTokens = (req) => {
  const authHeader = req.headers.authorization;
  const cookieToken = getCookieValue(req.headers.cookie, 'faive_admin_token');
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  return [cookieToken, bearerToken].filter(Boolean);
};

const decodeRequestToken = (req) => {
  const tokens = getRequestTokens(req);

  if (!tokens.length) {
    throw new ApiError(401, 'Authentication token is required');
  }

  for (const token of tokens) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      continue;
    }
  }

  throw new ApiError(401, 'Invalid authentication token');
};

const protect = asyncHandler(async (req, res, next) => {
  const decoded = decodeRequestToken(req);

  if (!isDbReady(req)) {
    req.user = {
      _id: decoded.id,
      name: 'Platform Administrator',
      email: process.env.ADMIN_SEED_EMAIL,
      role: decoded.role || 'super_admin'
    };
    next();
    return;
  }

  const admin = await Admin.findById(decoded.id).select('-passwordHash');

  if (!admin) {
    throw new ApiError(401, 'Invalid authentication token');
  }

  req.user = admin;
  next();
});

const protectPage = asyncHandler(async (req, res, next) => {
  const tokens = getRequestTokens(req);

  if (!tokens.length) {
    res.redirect('/admin/login');
    return;
  }

  try {
    const decoded = decodeRequestToken(req);

    if (!isDbReady(req)) {
      req.user = {
        _id: decoded.id,
        name: 'Platform Administrator',
        email: process.env.ADMIN_SEED_EMAIL,
        role: decoded.role || 'super_admin'
      };
      next();
      return;
    }

    const admin = await Admin.findById(decoded.id).select('-passwordHash');

    if (!admin) {
      res.clearCookie('faive_admin_token');
      res.redirect('/admin/login');
      return;
    }

    req.user = admin;
    next();
  } catch (error) {
    res.clearCookie('faive_admin_token');
    res.redirect('/admin/login');
  }
});

module.exports = { protect, protectPage };
