import { Request, Response, RequestHandler, NextFunction } from "express";
import bcrypt from "bcrypt";
//import User
import User from "../../classes/User";

//import function for generate token
import signJWT from "../../Tools/signJWT";

const loginUser: RequestHandler = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //find User
  User.findUserByUsername(req.body.username)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found!" });

      //compare password
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result) {
            //create token
            signJWT(user)
              .then((token) => {
                //set cookie
                res.cookie("Auth", token);

                res.send({ message: "logged in!", token, user });
              })
              .catch((err) => next(err));
          } else res.status(404).send({ message: "User not found!" });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const IsLogin: RequestHandler = (req: Request, res: Response) => {
  res.send({ message: "user loggedIn" });
};

export { loginUser, IsLogin };
