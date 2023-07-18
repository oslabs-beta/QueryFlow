import redis from 'redis';

const redisModel = redis.createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-14723.c289.us-west-1-2.ec2.cloud.redislabs.com',
    port: '14723'
  },
});

redisModel.on('connect',() => {
  console.log('Connected to Redis successfully!');
});

redisModel.connect();

export default redisModel;