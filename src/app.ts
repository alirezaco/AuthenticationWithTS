import express, { NextFunction, Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//import routes file
import { api } from "./routes/api";

//import config file
import config from "./config/config";

//create app
const app = express();

//cookie parser
app.use(cookieParser());

// Parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect to mongodb
mongoose
  .connect(config.MONGO.url, config.MONGO.options)
  .then(() => console.info("Connect to mongodb"))
  .catch((error) => console.error("no connect to mongodb\n", error.message));

//send public folder
app.use(express.static(path.join(__dirname, "../public")));

//api
app.use("/", api);

//Error handler(500)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Message:");
  console.error(err.message);
  console.log(
    "----------------------------------------------------------------------------------------------"
  );
  console.error(err.stack);

  const error: Error = new Error("server Error");

  res.status(500).send(error.message);
});

//Error handling(404)
app.use((req, res) => {
  const error: Error = new Error("Not Found!");

  res.status(404).send({ message: error.message });
});

//listen on port 4000;
app.listen(4000, () => {
  console.log("Server listen on port 4000");
});
