import express from "express";
import bcrypt from "bcrypt";

//user model
import Users, { UserFace } from "../classes/User";

//middleware for check token
import checkToken from "../middleware/checkJWT";

//create router
const router = express.Router();

//create user
router.post("/", (req, res, next) => {
  const newUser: UserFace = req.body;

  Users.createUser(newUser)
    .then(() => res.send({ message: "New user created" }))
    .catch((err) => next(err));
});

//get User By username
router.get("/username/:username", (req, res, next) => {
  Users.findUserByUsername(req.params.username)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "Not Found" });
      res.send(user);
    })
    .catch((err) => next(err));
});

//check login
router.use(checkToken);

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
    .then((user) => {
      if (!user) return res.status(404).send({ message: "Not Found" });
      res.send(user);
    })
    .catch((err) => next(err));
});

//delete user
router.delete("/:id", (req, res, next) => {
  Users.deleteUser(req.params.id || res.locals.user._id)
    .then(() => res.send({ message: "User deleted" }))
    .catch((err) => next(err));
});

//update Password
router.put("/password/:id", (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  bcrypt
    .compare(oldPassword, res.locals.user.password)
    .then((result) => {
      if (!result) res.status(404).send("old password is incorrect");
      else return Users.updateUserPassword(req.params.id, newPassword);
    })
    .then((user) => res.send({ message: "User password updated", user }))
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
