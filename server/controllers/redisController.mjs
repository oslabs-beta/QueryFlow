// import redis from 'redis';
// import redisModel from '../models/redisModel.mjs';

// const redisController = {};

// redisController.latency = async (req, res, next) => {
//   redisModel.on('connect',() => {
//     console.log('connected to redis successfully!');
//   });

//   const { resultData, totalTimeSQL} = res.locals.queryResultSQL;

//   try {
//     redisModel.json.set('Result', '.', resultData, (err) => {
//       if (err) {
//         console.error('Error storing data in Redis:', err);
//         return res.status(500).json({ error: 'Failed to store data in Redis' });
//       }
//       return res.status(200).json({ message: 'Data stored successfully' });
//     });
//     // Calculate performance metrics (e.g., time taken to retrieve the value)
//     const startTime = process.hrtime();
//     const getResult = await redisModel.json.get('Result', {
//       path: '.',
//     });
//     // Below comment may work exactly as the above getResult
//     // const getResult = await redisModel.json.get('Result', '.');
//     const endTime = process.hrtime(startTime);
//     const totalTimeRedis = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
//     const resObj = {};
//     //This is the time it takes for redis to get the key-value data
//     resObj.totalTimeRedis = totalTimeRedis;
//     //This is the time it takes for PostgreSQL to get the data
//     resObj.totalTimeSQL = totalTimeSQL;

//     res.locals.comparisonData = resObj;

//     return next();
//   } catch (err) {
//     return next({
//       log: 'Error handler caught error in redisController.latency middleware',
//       status: 500,
//       message: 'Failed to perform Redis operation'
//     });
//   }
// };

// export default redisController;