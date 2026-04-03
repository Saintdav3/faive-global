const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bootstrapAdmin = require('./utils/bootstrapAdmin');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { loginPage } = require('./controllers/authController');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.locals.dbReady = false;
const allowedOrigins = new Set(
  (process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
    : []
  ).filter(Boolean)
);

allowedOrigins.add(`http://127.0.0.1:${process.env.PORT || 5000}`);
allowedOrigins.add(`http://localhost:${process.env.PORT || 5000}`);
allowedOrigins.add('http://127.0.0.1:5500');
allowedOrigins.add('http://localhost:5500');

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || !allowedOrigins.size || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    database: app.locals.dbReady ? 'connected' : 'degraded',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contact', contactRoutes);

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'admin-login.html'));
});

app.post('/admin/login', loginPage);

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'dashboard.html'));
});

app.get('/pages/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'dashboard.html'));
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.locals.dbReady = true;
    await bootstrapAdmin();
  } catch (error) {
    app.locals.dbReady = false;
    console.error('MongoDB unavailable. Starting in degraded mode.', error.message);
  }

  app.listen(port, () => {
    console.log(
      `Faive Global server running on port ${port}${app.locals.dbReady ? '' : ' (degraded mode)'}`
    );
  });
};

startServer().catch((error) => {
  console.error('Server failed to start', error);
  process.exit(1);
});
