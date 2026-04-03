const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const bootstrapAdmin = async () => {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    name: 'Platform Administrator',
    email,
    passwordHash,
    role: 'super_admin'
  });
};

module.exports = bootstrapAdmin;
