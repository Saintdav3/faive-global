const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/jwt');
const { isDbReady } = require('../utils/dbAvailability');

const buildFallbackAdmin = () => ({
  _id: 'fallback-admin',
  name: 'Platform Administrator',
  email: process.env.ADMIN_SEED_EMAIL,
  role: 'super_admin'
});

const authenticateAdmin = async (req, email, password) => {
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  let admin;
  let isPasswordValid = false;

  if (isDbReady(req)) {
    admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin) {
      isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    }
  } else {
    const fallbackEmail = process.env.ADMIN_SEED_EMAIL?.toLowerCase();
    const fallbackPassword = process.env.ADMIN_SEED_PASSWORD;

    if (fallbackEmail && fallbackPassword && email.toLowerCase() === fallbackEmail) {
      admin = buildFallbackAdmin();
      isPasswordValid = password === fallbackPassword;
    }
  }

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({ id: admin._id, role: admin.role });

  return { admin, token };
};

const setAdminCookie = (res, token) => {
  res.cookie('faive_admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { admin, token } = await authenticateAdmin(req, email, password);

  setAdminCookie(res, token);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    }
  });
});

const loginPage = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token } = await authenticateAdmin(req, email, password);

  setAdminCookie(res, token);
  res.redirect('/admin');
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('faive_admin_token');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

module.exports = { login, loginPage, logout, getMe };
