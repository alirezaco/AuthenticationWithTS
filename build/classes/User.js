"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var user_1 = __importDefault(require("../models/user"));
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.findAllUser = function () {
        return new Promise(function (resolve, reject) {
            user_1.default.find({})
                .then(function (users) {
                resolve(users);
                console.log(typeof users);
            })
                .catch(function (err) { return reject(err); });
        });
    };
    return User;
}());
exports.User = User;
