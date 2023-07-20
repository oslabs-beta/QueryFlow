import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dirname, resolve } from 'path';
import compression from 'compression';
import apiRouter from './routes/apiRoutes.mjs';
import loginRouter from './routes/loginRoutes.mjs';

// We utilize the fileURLToPath function from the url module to convert the import.meta.url to the corresponding file path??
const __filename = fileURLToPath(import.meta.url);

// We extract the directory name using the dirname function from the path module
const __dirname = dirname(__filename);

// Initiate express server
const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression middleware for better performance & other middleware
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/dist', (req, res, next) => {
  if (req.path.endsWith('.png')) {
    res.setHeader('Content-Type', 'image/png');
  } else if (req.path.endsWith('.jpg') || req.path.endsWith('.jpeg')) {
    res.setHeader('Content-Type', 'image/jpeg');
  } else if (req.path.endsWith('.avif')) {
    res.setHeader('Content-Type', 'image/avif');
  } 
  next();
});

// Serve static assets
// Change to '../src' if problem. This current setup is for distribution
app.use(express.static(resolve(__dirname, '../dist')));

// Use apiRouter/loginRouter
app.use('/api', apiRouter, loginRouter);

// Serve index.html file
// Change to '../index.html' if problem. This current setup is for distribution
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../dist/index.html'));
});


// Route error handler
app.use('*', (req, res) => {
  return res.status(404).send('Page not Found');
});

// GLOBAL error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An Error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


