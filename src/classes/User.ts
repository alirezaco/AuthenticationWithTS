import UserDoc, { UserModel } from "../models/user";

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
      UserDoc.find({})
        .then((users) => {
          resolve(users);
        })
        .catch((err) => reject(err));
    });
  },

  findUserById(id: string): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      UserDoc.findOne({ _id: id })
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
      UserDoc.deleteOne({ _id: userId })
        .then(() => {
          resolve();
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

  findUserByUsername(username: string): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      UserDoc.findOne({ username })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  },
};
