import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";

//create user schema
const UserSchema = new mongoose.Schema({
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

export interface UserModel extends mongoose.Document {
  name: string;
  username: string;
  password: string;
  email: string;
  age?: number;
  phoneNumber?: string;
}

UserSchema.pre<UserModel>("save", function(next) {
  const user = this;

  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(user.password, salt);

    this.password = hash;

    next();
  } catch (error) {
    console.error(error);
  }
});

export default mongoose.model<UserModel>("User", UserSchema);
