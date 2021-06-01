import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import redis from "redis";

//config file
import config from "../config/config";

//create client for redis
const redisClient = redis.createClient(config.REDIS.port);

const checkToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["Auth"];

  if (token) {
    //check token
    jwt.verify(
      token,
      config.SERVER.token.secret,
      (error: any, encoded: any) => {
        if (error || !encoded || !encoded.user)
          return res.status(404).send({ message: error || "Unauthorized" });

        redisClient.get(encoded.user.username, (err, data) => {
          if (err || !data || data !== token)
            return res.status(404).send({ message: error || "Unauthorized" });

          res.locals.user = encoded.user;

          next();
        });
      }
    );
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default checkToken;
