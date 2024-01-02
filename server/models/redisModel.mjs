import redis from 'redis';

const redisModel = redis.createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-15067.c325.us-east-1-4.ec2.cloud.redislabs.com',
    port: '15067'
  },
});

redisModel.on('connect',() => {
  console.log('Connected to Redis successfully!');
});

redisModel.connect();

export default redisModel;