import express, { NextFunction, Request, Response } from "express";
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

//Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Message:");
  console.error(err.message);
  console.log(
    "----------------------------------------------------------------------------------------------"
  );
  console.error(err.stack);

  const error: Error = new Error("server Error");

  res.status(500).send(error);
});

//listen on port 4000;
app.listen(4000, () => {
  console.log("Server listen on port 4000");
});
