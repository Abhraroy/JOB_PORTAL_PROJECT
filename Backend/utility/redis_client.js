import redis from "redis"
import dotenv from "dotenv"
dotenv.config()


const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});
  
redisClient.on("error", function(err) {
    throw err;
});
await redisClient.connect()

  



export default redisClient