import ourDBModel from '../models/ourDBModel.mjs';
import moment from 'moment';

const ourDBController = {};

ourDBController.queryPush = async (req, res, next) => {
  const { _id, querystring, queryname, querydelay, querycount } = res.locals.metrics;
  console.log('hey i am query push seeing the metrics',res.locals.metrics);
  const date = moment().format();
  
  const querymetrics = JSON.stringify(res.locals.metrics.querymetrics);
  console.log(querymetrics);
  console.log(typeof querydelay);
  const string = `INSERT INTO metrics (querystring, querymetrics, queryname, querycount, querydelay, users_id, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  try {
    const result = await ourDBModel(string, [querystring, querymetrics, queryname, querycount, querydelay, _id, date]);
    console.log(result);
    res.locals.querymetrics = result;
    delete res.locals.metrics._id;
    delete res.locals.metrics.querystring;
    res.locals.metrics.created_at = date;
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
  const {_id} = req.body;
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

export default ourDBController;