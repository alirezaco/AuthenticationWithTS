"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
//import routers
var User_1 = __importDefault(require("./User"));
//create router
var router = express_1.default.Router();
exports.api = router;
//send login page
router.get("/", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../public/login.html"));
});
//send signUp page
router.get("/signUp", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../public/singUp.html"));
});
//user router
router.use("/user", User_1.default);
