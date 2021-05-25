import express from "express";

//user model
import User from "../models/user";

//create router
const router = express.Router();

//create user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();

    res.send("ok");
  } catch (error) {
    console.error(error);

    res.status(500).send("server error");
  }
});

//find user all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, __v: 0 });

    res.send(users);
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
});

//export router
export default router;
