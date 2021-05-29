import express from "express";
import path from "path";
import mongoose from "mongoose";

//import routes file
import { api } from "./routes/api";

//create app
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/login");

//send public folder
app.use(express.static(path.join(__dirname, "../public")));

//api
app.use("/", api);

//listen on port 4000;
app.listen(4000, () => {
  console.log("Server listen on port 4000");
});
