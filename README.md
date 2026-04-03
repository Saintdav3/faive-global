# Faive Global

Faive Global is a full-stack creative agency platform built as a production-shaped monorepo. It combines a luxury marketing website, portfolio CMS, admin dashboard, lead management workflows, and media-ready backend services for a global agency operation.

## Folder Structure

```text
faive-global/
├── client/
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── js/
│   ├── pages/
│   ├── services/
│   └── index.html
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Architecture Overview

### Frontend

- Static multi-page application using HTML5, CSS3, Bootstrap 5, and vanilla ES modules
- Shared shell components in `client/components/` for header, footer, dashboard layout, and modal composition
- Centralized API handling in `client/js/api.js`
- Auth token persistence via `client/services/storage.js`
- Dynamic DOM rendering for services, portfolio, brands, testimonials, quote requests, and contact submissions
- Protected admin dashboard flow using JWT validation against `/api/auth/me`

### Backend

- Express server with MVC separation
- Mongoose models for agency content, leads, and admin access
- JWT authentication and bcrypt password hashing
- Multer in-memory uploads with Cloudinary URL persistence
- Nodemailer integration for contact and quote automations
- Centralized async error handling and protected route middleware

## Backend Setup

1. Copy the environment template.

```bash
cp .env.example .env
```

2. Install root tooling and backend dependencies.

```bash
npm install
npm install --prefix server
```

3. Start the backend only.

```bash
npm run server
```

The API will run on `http://localhost:5000` unless `PORT` is overridden.

## Frontend Run Instructions

1. Install dependencies if you have not already.

```bash
npm install
npm install --prefix server
```

2. Start the static client and backend together.

```bash
npm run dev
```

This starts:

- Backend API on `http://localhost:5000`
- Static client on `http://127.0.0.1:5500`

## MongoDB Atlas Setup

Use this step-by-step flow to connect the project to MongoDB Atlas.

### Step 1: Create a MongoDB Atlas account

1. Go to `https://www.mongodb.com/atlas`.
2. Sign up or log in.
3. Create a new project, for example `Faive Global`.

### Step 2: Create a cluster

1. Inside the project, click `Build a Database`.
2. Choose an Atlas cluster option.
3. Pick your preferred cloud provider and region.
4. Name the cluster and create it.
5. Wait for Atlas to finish provisioning.

### Step 3: Create a database user

1. Open `Database Access`.
2. Click `Add New Database User`.
3. Create a username and password.
4. Give the user read/write access to the project.
5. Save the credentials somewhere safe.

### Step 4: Allow network access

1. Open `Network Access`.
2. Click `Add IP Address`.
3. Add your current development IP address.
4. For quick development only, you can allow `0.0.0.0/0`.
5. Save the rule and wait for it to apply.

### Step 5: Get the connection string

1. Open `Database`.
2. Click `Connect` on your cluster.
3. Choose `Drivers`.
4. Select `Node.js`.
5. Copy the provided MongoDB connection string.

It will look similar to this:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faive-global?retryWrites=true&w=majority
```

### Step 6: Add the connection string to the project

1. Open your local `.env` file in the project root.
2. Replace the `MONGODB_URI` value with your Atlas string.
3. Replace `username`, `password`, and database name as needed.

Example:

```env
MONGODB_URI=mongodb+srv://myUser:myPassword@cluster.mongodb.net/faive-global?retryWrites=true&w=majority
```

### Step 7: Start the backend

Run:

```bash
npm run server
```

If MongoDB is connected correctly, the server should start without the `MONGODB_URI is not defined` error.

### Step 8: Confirm the app is using MongoDB

1. Submit a contact form or quote request from the frontend.
2. Open Atlas and browse the `faive-global` database.
3. Check that collections such as `contactmessages` or `quoterequests` are created.
4. Confirm documents are appearing after submissions.

### Development Note

- For local development, Atlas is the easiest option because this project is already configured with Mongoose for a cloud MongoDB URI.
- Use a dedicated database name such as `faive-global` to keep this project isolated.

## Migrating From MongoDB To Hostinger MySQL

This project is currently built on MongoDB and Mongoose. Moving to Hostinger MySQL is possible, but it is a backend migration, not just an environment variable change.

Use the process below if you want to move the project safely.

### Step 1: Create your MySQL database in Hostinger

1. Log in to your Hostinger dashboard.
2. Open the hosting or VPS panel for your project.
3. Go to the `Databases` section.
4. Create a new MySQL database.
5. Create a database user and password.
6. Save the following values:
   - database name
   - username
   - password
   - host
   - port

### Step 2: Decide how you want to connect Node.js to MySQL

Choose one of these approaches:

- `Prisma`
  Recommended for cleaner schema management, migrations, and long-term maintenance.
- `mysql2`
  Good for a smaller and faster low-level rewrite, but more manual.

Recommended choice:

- Use `Prisma` if you want the easiest structure to maintain later.

### Step 3: Add new environment variables

Update your root `.env` file with MySQL values from Hostinger.

Example:

```env
DB_HOST=your-hostinger-db-host
DB_PORT=3306
DB_NAME=faive_global
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

If you use Prisma, you will usually also add:

```env
DATABASE_URL="mysql://your_db_user:your_db_password@your-hostinger-db-host:3306/faive_global"
```

### Step 4: Replace the MongoDB connection layer

The current backend uses MongoDB here:

- [`server/config/db.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/config/db.js)
- [`server/models/Admin.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/Admin.js)
- [`server/models/Brand.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/Brand.js)
- [`server/models/Portfolio.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/Portfolio.js)
- [`server/models/Service.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/Service.js)
- [`server/models/Testimonial.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/Testimonial.js)
- [`server/models/QuoteRequest.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/QuoteRequest.js)
- [`server/models/ContactMessage.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/models/ContactMessage.js)

You will need to:

1. Remove the Mongoose connection logic from [`server/config/db.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/config/db.js).
2. Replace it with a MySQL connection or Prisma client.
3. Update server startup so it checks MySQL instead of MongoDB.

### Step 5: Convert your MongoDB models into SQL tables

At minimum, create SQL tables for:

- `admins`
- `brands`
- `services`
- `portfolio`
- `testimonials`
- `quote_requests`
- `contact_messages`

You will also likely need a join table such as:

- `portfolio_services`

Because SQL is relational, references that were previously stored as Mongo `ObjectId` values will need proper foreign keys.

### Step 6: Rewrite the controllers to use MySQL

The controllers in [`server/controllers/`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers) currently query MongoDB directly.

You will need to replace:

- `find()`
- `findById()`
- `findOne()`
- `create()`
- `findByIdAndUpdate()`
- `findByIdAndDelete()`
- `populate()`

with MySQL queries or ORM equivalents.

Files that will need migration include:

- [`server/controllers/authController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/authController.js)
- [`server/controllers/brandController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/brandController.js)
- [`server/controllers/serviceController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/serviceController.js)
- [`server/controllers/portfolioController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/portfolioController.js)
- [`server/controllers/testimonialController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/testimonialController.js)
- [`server/controllers/quoteController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/quoteController.js)
- [`server/controllers/contactController.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/controllers/contactController.js)

### Step 7: Handle relationships carefully

The biggest difference between MongoDB and MySQL in this project is relationships.

Examples:

- `portfolio.brand` should become a foreign key to `brands.id`
- `testimonial.portfolio` should become a foreign key to `portfolio.id`
- `quote_requests.serviceInterest` should become a foreign key to `services.id`
- `portfolio.services` should likely move into a `portfolio_services` join table

### Step 8: Recreate the admin seed flow

The current project seeds the first admin at startup using:

- [`server/utils/bootstrapAdmin.js`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/utils/bootstrapAdmin.js)

When moving to MySQL:

1. Rewrite that utility to check the `admins` table.
2. Insert the seed admin if it does not exist.
3. Keep password hashing with `bcryptjs`.

### Step 9: Migrate existing content

If your content already lives in MongoDB, export and reinsert it into MySQL.

Recommended order:

1. `brands`
2. `services`
3. `portfolio`
4. `testimonials`
5. `quote_requests`
6. `contact_messages`
7. `admins`

Make sure referenced records are inserted before rows that depend on them.

### Step 10: Test every API route after migration

After switching the database layer:

1. Start the backend.
2. Test `GET /api/health`.
3. Test admin login.
4. Test dashboard reads.
5. Test create, edit, and delete flows for brands, services, portfolio, and testimonials.
6. Test quote and contact form submission.
7. Test media upload and email flows.

### Step 11: Remove MongoDB-only configuration

After the MySQL migration is stable:

1. Remove `MONGODB_URI` from `.env`.
2. Remove unused Mongoose model files if they are no longer needed.
3. Remove the `mongoose` dependency from [`server/package.json`](/Users/davidnwagrabe/Documents/Web-Dev/faive-global/server/package.json).
4. Update deployment environment variables to use Hostinger MySQL credentials.

### Step 12: Update documentation and deployment

Before launch:

1. Update the README to reflect MySQL instead of MongoDB.
2. Update health checks and setup docs.
3. Confirm your hosting environment can connect to the Hostinger MySQL host.
4. Confirm CORS and environment values are correct in production.

## Cloudinary Setup

1. Create a Cloudinary account.
2. Copy your cloud name, API key, and API secret into `.env`.
3. Portfolio hero media uploads and quote attachments will be uploaded to Cloudinary.
4. Only secure URLs are persisted in MongoDB.

Required variables:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Nodemailer / SMTP Setup

1. Choose an SMTP provider such as Mailtrap, SendGrid SMTP, Postmark SMTP, or Amazon SES SMTP.
2. Add SMTP credentials to `.env`.
3. Configure the internal recipient with `AGENCY_EMAIL`.

Required variables:

```env
AGENCY_EMAIL=hello@faiveglobal.com
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=Faive Global
SMTP_FROM_EMAIL=no-reply@faiveglobal.com
```

Automation behavior:

- Contact form submissions are stored in MongoDB and trigger an agency notification email.
- Quote requests are stored in MongoDB, notify the agency inbox, and send a confirmation email to the client.

## Environment Variables

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://127.0.0.1:5500
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
ADMIN_SEED_EMAIL=admin@faiveglobal.com
ADMIN_SEED_PASSWORD=ChangeMe123!
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
AGENCY_EMAIL=hello@faiveglobal.com
SMTP_HOST=
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=Faive Global
SMTP_FROM_EMAIL=no-reply@faiveglobal.com
```

## Authentication Flow

- `POST /api/auth/login` returns a JWT and admin profile
- `GET /api/auth/me` validates the token for dashboard access
- Protected routes cover:
  - portfolio create/update/delete
  - testimonial create/update/delete
  - brand create/update/delete
  - service create/update/delete
  - quote request administration
  - contact message administration

The server also supports seeded first-admin creation using `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` on startup.

## API Surface

### Auth

- `POST /api/auth/login`
- `GET /api/auth/me`

### Portfolio

- `GET /api/portfolio`
- `GET /api/portfolio/:id`
- `POST /api/portfolio`
- `PUT /api/portfolio/:id`
- `DELETE /api/portfolio/:id`
- `POST /api/portfolio/media/upload`

### Testimonials

- `GET /api/testimonials`
- `GET /api/testimonials/:id`
- `POST /api/testimonials`
- `PUT /api/testimonials/:id`
- `DELETE /api/testimonials/:id`

### Brands

- `GET /api/brands`
- `GET /api/brands/:id`
- `POST /api/brands`
- `PUT /api/brands/:id`
- `DELETE /api/brands/:id`

### Services

- `GET /api/services`
- `GET /api/services/:id`
- `POST /api/services`
- `PUT /api/services/:id`
- `DELETE /api/services/:id`

### Quotes

- `GET /api/quotes`
- `GET /api/quotes/:id`
- `POST /api/quotes`
- `PUT /api/quotes/:id`
- `DELETE /api/quotes/:id`

### Contact

- `GET /api/contact`
- `GET /api/contact/:id`
- `POST /api/contact`
- `PUT /api/contact/:id`
- `DELETE /api/contact/:id`

## Media Handling Flow

1. Admin uploads media through the portfolio media endpoint or attaches quote files.
2. Multer stores the file in memory during request processing.
3. Cloudinary receives the file and returns a secure URL.
4. MongoDB stores only the returned URL and media metadata.

<!-- CHECKLIST -->

## Pre-Launch Checklist

Use this checklist before publishing the website publicly.

### 1. Database and Backend

- [ ] Confirm `MONGODB_URI` in `.env` is correct
- [ ] Whitelist your current IP in MongoDB Atlas `Network Access`
- [ ] Confirm the Atlas database user exists and password is correct
- [ ] Start the backend successfully with `npm run start --prefix server`
- [ ] Confirm `http://localhost:5000/api/health` responds correctly

### 2. Admin Access

- [ ] Confirm the seeded admin credentials work
- [ ] Log in through `/pages/admin-login.html`
- [ ] Confirm dashboard access is blocked when no token is present
- [ ] Change the default admin password before launch
- [ ] Replace the default `JWT_SECRET` with a strong production secret

### 3. Content Population

- [ ] Add real Faive Global services
- [ ] Add real brand entries and logos
- [ ] Add real testimonials
- [ ] Add real portfolio projects and case studies
- [ ] Replace temporary placeholders with real campaign media where available

### 4. Contact and Quote Flows

- [ ] Test the contact form submission
- [ ] Test the quote request form submission
- [ ] Confirm submissions are saved to MongoDB
- [ ] Confirm quote and contact records appear in the admin dashboard

### 5. Cloudinary Setup

- [ ] Add real `CLOUDINARY_CLOUD_NAME`
- [ ] Add real `CLOUDINARY_API_KEY`
- [ ] Add real `CLOUDINARY_API_SECRET`
- [ ] Upload a test image or video through the media flow
- [ ] Confirm only Cloudinary URLs are stored in MongoDB

### 6. Email Setup

- [ ] Add working SMTP credentials to `.env`
- [ ] Set `AGENCY_EMAIL` to the real business inbox
- [ ] Test admin notification emails
- [ ] Test client confirmation emails

### 7. Design and UI Review

- [ ] Review all pages on desktop
- [ ] Review all pages on laptop widths
- [ ] Review all pages on tablet and mobile
- [ ] Check typography, spacing, and image proportions
- [ ] Confirm no page feels incomplete or stretched

### 8. Security and Privacy

- [ ] Keep admin links hidden from public navigation
- [ ] Add stronger admin protection if needed such as IP allowlisting or reverse proxy auth
- [ ] Rotate any credentials that were shared insecurely during setup
- [ ] Make sure `.env` is not committed

### 9. Production Cleanup

- [ ] Replace default placeholder values in `.env`
- [ ] Replace test contact details if needed
- [ ] Remove any demo or temporary content
- [ ] Check console for frontend errors
- [ ] Check backend logs for runtime errors

### 10. Final Launch Verification

- [ ] Homepage loads correctly
- [ ] Services page content is accurate
- [ ] Portfolio and case studies open correctly
- [ ] Brands and testimonials pages render correctly
- [ ] Contact and quote buttons work
- [ ] Admin login works
- [ ] Media uploads work
- [ ] Emails send successfully
- [ ] Deployment URLs and CORS settings are correct

## Deployment Strategy

### Option 1: Single Node deployment

- Deploy the Express server to Render, Railway, Fly.io, or a VPS
- Serve the `client/` directory statically from the same Express process
- Point environment variables to MongoDB Atlas, Cloudinary, and SMTP services

### Option 2: Split deployment

- Host the static `client/` on Netlify, Vercel static hosting, or Cloudflare Pages
- Deploy the Express API separately
- Set `CLIENT_URL` and CORS origins to the frontend domain
- Update `API_BASE_URL` handling if your API runs on a custom hostname

### Production hardening recommendations

- Add rate limiting and request logging storage
- Add role-based authorization expansion on top of the current role-ready admin model
- Add audit trails for admin mutations
- Add pagination and search for large content sets
- Add image transformation presets on Cloudinary
- Add CI checks, test coverage, and secrets management for deployment

## Notes For Development

- The dashboard currently uses modal-based CRUD flows for the main content collections and lead status updates.
- Portfolio management accepts media URLs directly in the admin UI and also supports authenticated file uploads through the media endpoint.
- The frontend is intentionally framework-free but organized into reusable modules and page-specific initializers.
