"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt_1 = __importDefault(require("bcrypt"));
//create user schema
var UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
});
UserSchema.pre("save", function (next) {
    var user = this;
    try {
        var salt = bcrypt_1.default.genSaltSync(10);
        var hash = bcrypt_1.default.hashSync(user.password, salt);
        this.password = hash;
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
