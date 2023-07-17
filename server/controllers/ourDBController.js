import ourDBModel from '../models/ourDBModel.mjs';
import moment from 'moment';

const ourDBController = {};

// Pushes queries into the database
ourDBController.queryPush = async (req, res, next) => {
  const { _id, queryString, queryName, queryDelay, queryCount, queryMetrics, averageTime } = res.locals.metrics;
  const stringQueryMetrics = JSON.stringify(queryMetrics);
  const createdAt = moment().format('MMMM Do, YYYY, h:mma Z');
  const string = { text: `INSERT INTO metrics (queryString, queryMetrics, queryName, queryCount, queryDelay, averageTime, users_id, createdAt)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, values: [queryString, stringQueryMetrics, queryName, queryCount, queryDelay, averageTime, _id, createdAt] };
  try {

    await ourDBModel(string);
    res.locals.metrics.createdAt = createdAt;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryPush middleware',
      status: 400,
      message: 'An error occurred while pushing a query into the primary database',
    });
  }
};

// Gets query data for the user
ourDBController.queryGet = async (req, res, next) => {
  const { _id } = req.user;
  
  const string = {text: 'SELECT * FROM metrics WHERE users_id = $1', values:[_id] };
  try {
    const result = await ourDBModel(string);
    const resultData = result.rows;
    const returnDataMetrics = resultData.map(({ users_id, ...rest }) => rest);  
    res.locals.getMetrics = returnDataMetrics;
    
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryGet middleware',
      status: 400,
      message: 'An error occurred while fetching query data',
    });
  }
};

// Deletes queries by their id
ourDBController.deleteQueryById = async (req, res, next) => {
  const { _id } = req.body;
 
  const userId = req.user._id;
  
  const string = {text: 'DELETE FROM metrics WHERE _id = $1 AND users_id = $2', values:[_id,userId] };
  try {
    const result = await ourDBModel(string);
     
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.deleteQueryById middleware',
      status: 400,
      message: 'Error handler caught error in ourDBController.deleteQueryById middleware',
    });
  }
};

// ===== Unused middleware, preserving for later use if needed =====
// Deletes queries by their name
// ourDBController.deleteQueryByName = async (req, res, next) => {
//   const { queryName } = req.body;
//   const string = {text: 'DELETE FROM metrics WHERE queryName = $1', values:[queryName] };
//   try {
//     const result = await ourDBModel(string);
//     return next();
//   } catch (err) {
//     return next({
//       log: 'Error handler caught error in ourDBController.deleteQueryByName middleware',
//       status: 400,
//       message: 'Error handler caught error in ourDBController.deleteQueryByName middleware',
//     });
//   }
// };

export default ourDBController;