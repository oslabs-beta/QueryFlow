import redis from 'redis';
import redisModel from '../models/redisModel.mjs';
const redisController = {};

redisController.latency = async (req, res, next) => {
  redisModel.on('connect',() => {
    console.log('connected to redis successfully!');
  });
  const { resultdata, totalTimeQuery } = res.locals.testjson;
  console.log('This is resultdata: ' + resultdata);
  try {
    redisModel.json.set('Result', '.', resultdata, (err) => {
      if (err) {
        console.error('Error storing data in Redis:', err);
        return res.status(500).json({ error: 'Failed to store data in Redis' });
      }
      return res.status(200).json({ message: 'Data stored successfully' });
    });
    const resObj = {};
    // Calculate performance metrics (e.g., time taken to retrieve the value)
    const startTime = process.hrtime();
    const getResult = await redisModel.json.get('Result', {
      path: '.',
    });
    console.log(getResult);
    const endTime = process.hrtime(startTime);
    const totalTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
    resObj.value = getResult;
    //This is the time it takes for redis to get the key-value data
    resObj.totalTime = totalTime;
    //This is the time it takes for PostgreSQL to get the data
    resObj.totalTimeQuery = totalTimeQuery;
    res.locals.testdata = resObj;
    console.log('This is the total results: ', resObj);
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform Redis operation.' });
  }
};

export default redisController;