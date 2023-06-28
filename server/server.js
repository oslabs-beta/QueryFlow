import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors'
import cookieParser from 'cookie-parser';


//we utilize the fileURLToPath function from the url module to convert the import.meta.url to the corresponding file path.
import { dirname, resolve } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//we extract the directory name using the dirname function from the path module

const app = express();
const PORT = process.env.PORT || 3000;


// Enable compression middleware for better performance
app.use(compression());
// Enable other middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Serve static assets (compiled SvelteKit files)
app.use(express.static(resolve(__dirname, '../src')));

// Handle all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../index.html'));
});

// testing post request
app.post('/api', (req, res) => {
  res.status(201).json('ayo?');
})

//Route error handler
app.use('*', (req, res) => {
  return res.status(404).send('Page not Found');
});

//GLOBAL error handler
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

