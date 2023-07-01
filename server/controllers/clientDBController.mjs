import pg from 'pg';
const { Pool } = pg;

// Our client's URI from req.body
let clientURI = '';

const pool = new Pool({
  connectionString: clientURI
});
 
const clientDBModel = function(text, params, callback) {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};

const clientDBController = {};

clientDBController.postMetrics = async (req, res, next) => {
  const { URI, queryString, num } = req.body;
  clientURI = URI;
  const query = `${queryString}`;
  try {
    const delayedTasks = Array.from({length: 10}, (_, i) => i).map(i => 
      new Promise(resolve => {
        setTimeout(async () => {
          const data = await clientDBModel(queryString);
          const parsedData = data.rows;
          const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
          const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
          console.log('Planning Time: ', planningTime);
          console.log('Execution Time: ', executionTime);
          res.locals.executionTime = executionTime;
          res.locals.planningTime = planningTime;
          resolve();
        }, i * 5000);
      })
    );
    await Promise.all(delayedTasks);
    console.log(delayedTasks);
    res.locals.metrics = delayedTasks;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in clientDBController.postMetrics middleware',
      status: 400,
      message: 'Error handler caught error in clientDBController.postMetrics middleware'
    });
  }
};

export default clientDBController;

