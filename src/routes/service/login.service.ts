import { Request, Response, RequestHandler, NextFunction } from "express";

//import User
import User from "../../classes/User";

const loginUser: RequestHandler = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  User.findUserByUsername(req.body.username)
    .then((user) => {
      if (user && user.password == req.body.password)
        res.send({ message: "logged in!" });
      else res.status(404).send({ message: "User not found!" });
    })
    .catch((err) => next(err));
};

export { loginUser };
