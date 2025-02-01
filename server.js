
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['https://pentridgemedia.com', 'https://pentridgemedia.xyz', 'https://www.pentridgemedia.com', 'https://www.pentridgemedia.xyz'],
  credentials: true
}));

// Trust proxy headers
app.enable('trust proxy');

// HTTPS redirect with proper header checks
app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(301, `https://${req.get('host')}${req.url}`);
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
