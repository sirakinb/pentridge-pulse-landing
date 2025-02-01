
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(express.static('dist'));

const allowedOrigins = [
  'https://pentridgemedia.com',
  'https://www.pentridgemedia.com',
  'https://pentridgemedia.xyz',
  'https://www.pentridgemedia.xyz',
  'http://pentridgemedia.com',
  'http://www.pentridgemedia.com',
  'http://pentridgemedia.xyz',
  'http://www.pentridgemedia.xyz'
];

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.set('trust proxy', true);

app.use((req, res, next) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    next();
  } else {
    const host = req.headers.host.split(':')[0];
    res.redirect(301, `https://${host}${req.url}`);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server is ready to accept connections');
});
