import UserDoc, { UserModel } from "../models/user";
import redis from "redis";

//config file
import config from "../config/config";

//create client for redis
const redisClient = redis.createClient(config.REDIS.port);

export interface UserFace {
  name: string;
  username: string;
  password: string;
  email: string;
  age?: number;
  phoneNumber?: string;
}

export default {
  findAllUser(): Promise<UserModel[]> {
    return new Promise((resolve, reject) => {
      UserDoc.find({}, { __v: 0, password: 0 })
        .then((users) => {
          resolve(users);
        })
        .catch((err) => reject(err));
    });
  },

  findUserById(id: string): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      UserDoc.findOne({ _id: id }, { __v: 0, password: 0 })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  },

  createUser(newUser: UserFace): Promise<void> {
    return new Promise((resolve, reject) => {
      UserDoc.create(newUser)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  },

  deleteUser(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      UserDoc.findByIdAndDelete(userId)
        .then((user) => {
          if (user) {
            redisClient.del(user.username, (err) => {
              if (err) return reject(err);
              resolve();
            });
          }
        })
        .catch((err) => reject(err));
    });
  },

  updateUser(userId: string, newUser: UserFace): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      UserDoc.findOneAndUpdate({ _id: userId }, newUser, { new: true })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  },

  updateUserPassword(userId: string, newPassword: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      UserDoc.findOneAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true }
      )
        .then((user) => {
          if (!user) return reject(new Error("User not found"));

          user.save();

          redisClient.del(user.username, (err) => {
            if (err) return reject(err);
            resolve(user);
          });
        })
        .catch((err) => reject(err));
    });
  },

  findUserByUsername(username: string): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      UserDoc.findOne({ username }, { __v: 0 })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  },
};
