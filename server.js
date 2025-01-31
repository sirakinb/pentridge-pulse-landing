const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('trust proxy', 1);
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else if (req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// Force HTTPS redirect
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// We don't need the email sending logic anymore