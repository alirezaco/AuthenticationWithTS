import express from "express";
import path from "path";

//import routers
import UserRouter from "./User";
import AuthRouter from "./auth";

//create router
const router = express.Router();

//send login page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

//send signUp page
router.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/singUp.html"));
});

//user router
router.use("/user", UserRouter);

//Auth router
router.use("/auth", AuthRouter);

//export router
export { router as api };
