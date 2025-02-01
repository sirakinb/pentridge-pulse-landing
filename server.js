
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(bodyParser.json());

// Configure CORS with specific origins
const allowedOrigins = [
  'https://pentridgemedia.com',
  'https://www.pentridgemedia.com',
  'https://pentridgemedia.xyz',
  'https://www.pentridgemedia.xyz'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Trust proxy headers
app.set('trust proxy', true);

// HTTPS redirect
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    const host = req.headers.host.split(':')[0];
    res.redirect(301, `https://${host}${req.url}`);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
