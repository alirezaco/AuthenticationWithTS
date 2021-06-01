import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

//config file
import config from "../config/config";

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
        if (error || !encoded) return res.status(404).send({ message: error });

        res.locals.jwt = encoded;

        next();
      }
    );
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default checkToken;
