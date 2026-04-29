his# Faive Global

Faive Global is now a frontend-only static website project.

It contains:

- public HTML pages in `client/`
- shared styles in `client/css/styles.css`
- lightweight frontend JavaScript in `client/js/`
- static portfolio data rendered client-side

It does not contain:

- backend/server code
- database models
- authentication
- admin dashboard
- API routes

## Project Structure

```text
faive-global/
├── client/
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
├── .env.example
├── package.json
└── README.md
```

## Run The Website

1. Install dependencies:

```bash
npm install
```

2. Start the static site:

```bash
npm run dev
```

3. Open:

```text
http://127.0.0.1:5500
```

## Frontend Notes

- Portfolio content is currently driven by static data in `client/js/portfolio.js`.
- Contact and quote forms are frontend-only and do not submit to a backend.
- Animations and page interactions are handled in `client/js/main.js`.

## Editing

- Homepage: `client/index.html`
- Inner pages: `client/pages/`
- Styling: `client/css/styles.css`
- Frontend behavior: `client/js/main.js`
- Portfolio content: `client/js/portfolio.js`
