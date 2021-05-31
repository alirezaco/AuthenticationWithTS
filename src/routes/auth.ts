import express from "express";

//import service
import { loginUser } from "./service/login.service";

//create app
const router = express.Router();

//Login router
router.post("/", loginUser);

//export router
export default router;
