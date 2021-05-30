import express from "express";

//user model
import Users, { UserFace } from "../classes/User";

//create router
const router = express.Router();

//create user
router.post("/", (req, res, next) => {
  const newUser: UserFace = req.body;

  Users.createUser(newUser)
    .then(() => res.send({ message: "New user created" }))
    .catch((err) => next(err));
});

//get all user
router.get("/", (req, res, next) => {
  Users.findAllUser()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
});

//get User By id
router.get("/:id", (req, res, next) => {
  Users.findUserById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
});

//delete user
router.delete("/:id", (req, res, next) => {
  Users.deleteUser(req.params.id)
    .then(() => res.send({ message: "User deleted" }))
    .catch((err) => next(err));
});

//Update User
router.put("/:id", (req, res, next) => {
  Users.updateUser(req.params.id, req.body)
    .then((newUser) => res.send({ message: "User updated", newUser }))
    .catch((err) => next(err));
});

//export router
export default router;
