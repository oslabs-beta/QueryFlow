import pg from 'pg';

const clientDBController = {};

//Takes in query & URI from client and gathers query metrics using client's database
clientDBController.queryMetrics = async (req, res, next) => {

  const { _id, uri, querystring, queryname, querycount, querydelay } = req.body;
 
  //Initiate new model
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: uri
  });

  const clientDBModel = function(text, params, callback) {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  };
 
  //Append Explain (options...) to client's query string. 
  const query = 'EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true,  FORMAT JSON)' + `${querystring}`;
  
  try {
    const delayedTasks = await Promise.all(
      Array.from({ length: querycount }, (_, i) => i).map(async (i) => {
        await new Promise((resolve) => setTimeout(resolve, i * (querydelay * 1000)));
        const data = await clientDBModel(query);
        const parsedData = data.rows;
        const planningTime = parsedData[0]['QUERY PLAN'][0]['Planning Time'];
        const executionTime = parsedData[0]['QUERY PLAN'][0]['Execution Time'];
        const totalTime = planningTime + executionTime; 
        const cacheSize = parsedData[0]['QUERY PLAN'][0]['Settings']['effective_cache_size'];
        const workingMem = parsedData[0]['QUERY PLAN'][0]['Settings']['work_mem'];
        const sharedHitBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Hit Blocks'];
        const sharedReadBlocks = parsedData[0]['QUERY PLAN'][0]['Planning']['Shared Read Blocks'];
        return {
          planningTime,executionTime,totalTime,cacheSize,workingMem,sharedHitBlocks,sharedReadBlocks
        };
      })
    );
    const metricsObj = {};
    // get avg query time
    metricsObj.averagetime = Number(delayedTasks.reduce((accum, obj) => accum + obj.totalTime, 0) / querycount).toFixed(2);
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
      log: 'Error handler caught error in clientDBController.queryMetrics middleware',
      status: 400,
      message: 'Error handler caught error in clientDBController.queryMetrics middleware',
    });
  }
};

export default clientDBController;

