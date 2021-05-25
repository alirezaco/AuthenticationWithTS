"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
//import routes file
var api_1 = require("./routes/api");
//create app
var app = express_1.default();
//connect to mongodb
mongoose_1.default.connect("mongodb://localhost:27017/login");
//send public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
//api
app.use("/", api_1.api);
//listen on port 4000;
app.listen(4000, function () {
    console.log("Server listen on port 4000");
});
