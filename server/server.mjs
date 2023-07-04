import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userController from './controllers/userController.mjs';
import clientDBController from './controllers/clientDBController.mjs';
import starWarsController from './controllers/starWarsController.mjs';
import ourDBController from './controllers/ourDBController.js';
import { dirname, resolve } from 'path';
import compression from 'compression';

//We utilize the fileURLToPath function from the url module to convert the import.meta.url to the corresponding file path??
const __filename = fileURLToPath(import.meta.url);
//we extract the directory name using the dirname function from the path module
const __dirname = dirname(__filename);

//Initiate express server. 
const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression middleware for better performance & Enable other middleware
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Serve static assets
app.use(express.static(resolve(__dirname, '../src')));

//Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, '../index.html'));
});

//Test route to star wars database to test what metrics are being returned
app.post('/api/test', starWarsController.queryMetrics, (req, res) => {
  res.status(201).json(res.locals.metrics);
});

//Client gets metrics from past queries stored in QueryFlow's database
app.post('/api/getmetrics', ourDBController.queryGet, (req, res) => {
  res.status(201).json(res.locals.getmetrics);
});

// app.post('/api/deletemetrics', ourDBController.deleteQuery, (req, res) => {
//   res.status(201).json({msg: 'Query Deleted'});
// });

//Route for signing up
app.post('/api/signup', userController.create, (req, res) => {
  res.status(201).json({msg: 'Account made'});
});

//Route for logging in
app.post('/api/login', userController.login, (req, res) => {
  res.status(201).json(res.locals.authentication);
});

//Route for querying our client's DB and extracting metrics. Redirect to postmetrics. 
app.post('/api/querymetrics', clientDBController.queryMetrics, ourDBController.queryPush, (req, res) => {
  res.status(201).json(res.locals.metrics);
});

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
