import jwt from "jsonwebtoken";
import { UserFace } from "../classes/User";
import redis from "redis";

//config file
import config from "../config/config";

//create client for redis
const redisClient = redis.createClient(config.REDIS.port);

const signJWT = function(user: UserFace): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(
        {
          user,
        },
        config.SERVER.token.secret,
        {
          expiresIn: config.SERVER.token.expireTime, // 1 day
        }
      );

      redisClient.setex(user.username, 60 * 60 * 24, token);

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export default signJWT;
