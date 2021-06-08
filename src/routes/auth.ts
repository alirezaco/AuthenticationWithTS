import express from "express";

//import service
import { loginUser, IsLogin, logOut } from "./service/login.service";

//middleware for check token
import checkToken from "../middleware/checkJWT";

//create app
const router = express.Router();

//Login router
router.post("/", loginUser);

//router for check login
router.get("/", checkToken, IsLogin);

//logout router
router.get("/logout", checkToken, logOut);

//export router
export default router;
