import express from "express";

//user model
import Users, { UserFace } from "../classes/User";

//create router
const router = express.Router();

//create user
router.post("/", (req, res, next) => {
  const newUser: UserFace = req.body;

  Users.createUser(newUser)
    .then(() => res.send({}))
    .catch((err) => next(err));
});

//find user all user
router.get("/", (req, res, next) => {
  Users.findAllUser()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
});

//export router
export default router;
