import express from "express";

//import service
import { loginUser } from "./service/login.service";

//create app
const app = express();

//Login router
app.post("/", loginUser);
