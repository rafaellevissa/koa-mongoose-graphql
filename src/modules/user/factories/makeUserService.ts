import MongooseUserCollection from "../repositories/user-collection";
import UserService from "../service/user-service";

export function makeUserService(): UserService {
  const userrepository = new MongooseUserCollection();
  return new UserService(userrepository);
}
