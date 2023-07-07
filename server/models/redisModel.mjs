import redis from 'redis';

const redisModel = redis.createClient({
  password: 'AN5MG1fuI82sCkEHjrU8XpeHXYtQdrgD',
  socket: {
    host: 'redis-14723.c289.us-west-1-2.ec2.cloud.redislabs.com',
    port: '14723'
  },
});

await redisModel.connect();

export default redisModel;