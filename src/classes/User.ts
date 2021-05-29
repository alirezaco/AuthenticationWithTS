import UserModel from "../models/user";
export class User {
  findAllUser(): Promise<object> {
    return new Promise((resolve, reject) => {
      UserModel.find({})
        .then((users: object) => {
          resolve(users);
          console.log(typeof users);
        })
        .catch((err) => reject(err));
    });
  }

  //findUserById(id: string);
}
