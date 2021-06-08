import express, { NextFunction, Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fs from "fs";

//import routes file
import { api } from "./routes/api";

//import config file
import config from "./config/config";

//create app
const app = express();

//create swagger
import swagger from "swagger-ui-express";
try {
  const swaggerDoc = fs.readFileSync(
    path.join(__dirname, "../swagger_docs.json"),
    "utf-8"
  );

  app.use("/api-docs", swagger.serve, swagger.setup(JSON.parse(swaggerDoc)));
} catch (error) {
  console.error(error);
}

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

  console.log(
    "----------------------------------------------------------------------------------------------"
  );

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
