import jwt from "jsonwebtoken";
import { UserFace } from "../classes/User";
//config file
import config from "../config/config";

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

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export default signJWT;
