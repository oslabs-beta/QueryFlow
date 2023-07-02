import pg from 'pg';
const { Pool } = pg;

const clientDBController = {};

clientDBController.queryMetrics = async (req, res, next) => {

  //Req Body. Need _id for when we redirect to our DB. Not included at the moment. 
  const { _id, uri, querystring, queryname, querycount, querydelay } = req.body;

  //Reassign client URI String to allow clientDBModel to function. 
  const clientURI = `${uri}`;

  //When client URI is deconstructed from the req.body, the pool and clientDBModel will be updated with this client URI
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: clientURI
  });

  const clientDBModel = function(text, params, callback) {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  };
 
  //Query string from passed in string. 
  const query = 'EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,  FORMAT JSON)' + `${querystring}`;
  
  try {
    const delayedTasks = await Promise.all(
      Array.from({ length: querycount }, (_, i) => i).map(async (i) => {
        await new Promise((resolve) => setTimeout(resolve, i * (querydelay * 1000)));
        const data = await clientDBModel(query);
        const parsedData = data.rows;
        const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
        const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
        const cacheSize = parsedData[0]['QUERY PLAN'][0]['Settings']['effective_cache_size'];
        const workingMem = parsedData[0]['QUERY PLAN'][0]['Settings']['work_mem'];
        const sharedHitBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Hit Blocks'];
        const sharedReadBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Read Blocks'];
        return {
          planningTime,executionTime,cacheSize,workingMem,sharedHitBlocks,sharedReadBlocks
        };
      })
    );
    const metricsObj = {};
    metricsObj._id = `${_id}`;
    metricsObj.querystring = querystring;
    metricsObj.queryname = queryname;
    metricsObj.querymetrics = [...delayedTasks];
    metricsObj.querydelay = querydelay;
    metricsObj.querycount = querycount;
    res.locals.metrics = metricsObj;
    return next();
  } catch (err) {
    return next({
      log: 'Error handler caught error in starWarsController.queryMetrics middleware',
      status: 400,
      message: 'Error handler caught error in starWarsController.queryMetrics middleware',
    });
  }
};

export default clientDBController;

