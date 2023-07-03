import ourDBModel from '../models/ourDBModel.mjs';
import moment from 'moment';

const ourDBController = {};

ourDBController.queryPush = async (req, res, next) => {
  const { _id, querystring, queryname, querydelay, querycount, querymetrics } = res.locals.metrics;
  const stringQuerymetrics = JSON.stringify(querymetrics);
  const date = moment().format();
  const string = `INSERT INTO metrics (querystring, querymetrics, queryname, querycount, querydelay, users_id, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  try {
    const result = await ourDBModel(string, [querystring, stringQuerymetrics, queryname, querycount, querydelay, _id, date]);
    res.locals.allquerydata = result;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryPush middleware',
      status: 400,
      message: 'Error handler caught error in ourDBController.queryPush middleware',
    });
  }
};

ourDBController.queryGet = async (req, res, next) => {
  //We might need to add queryname to this body. 
  const { _id } = req.body;
  const string = {text: 'SELECT * FROM metrics WHERE users_id = $1', values:[_id] };
  try {
    const result = await ourDBModel(string);
    const resultData = result.rows;
    const returnDataMetrics = resultData.map(({ _id, querystring, users_id, ...rest }) => rest);  
    res.locals.getmetrics = returnDataMetrics;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryGet middleware',
      status: 400,
      message: 'Error handler caught error in ourDBController.queryGet middleware',
    });
  }
};

ourDBController.deleteQueryById = async (req, res, next) => {

  const { _id } = req.body;
  const string = {text: 'SELECT * FROM metrics WHERE users_id = $1', values:[_id] };
  try {
    const result = await ourDBModel(string);
    const resultData = result.rows;
    const returnDataMetrics = resultData.map(({ _id, querystring, users_id, ...rest }) => rest);  
    res.locals.getmetrics = returnDataMetrics;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryGet middleware',
      status: 400,
      message: 'Error handler caught error in ourDBController.queryGet middleware',
    });
  }
};

ourDBController.deleteQueryByName = async (req, res, next) => {
  const { queryname } = req.body;
  const string = {text: 'SELECT * FROM metrics WHERE queryname = $1', values:[queryname] };
  try {
    const result = await ourDBModel(string);
    const resultData = result.rows;
    const returnDataMetrics = resultData.map(({ _id, querystring, users_id, ...rest }) => rest);  
    res.locals.getmetrics = returnDataMetrics;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in ourDBController.queryGet middleware',
      status: 400,
      message: 'Error handler caught error in ourDBController.queryGet middleware',
    });
  }
};

export default ourDBController;