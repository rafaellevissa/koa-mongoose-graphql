import Router from "koa-router";
import UserController from "../../controller/user/user-controller";
import isAuthenticated from "../../middleware/isAuthenticated";

const userController = new UserController();

const userRoutes = new Router();

userRoutes.post("/users", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.get("/users", isAuthenticated, userController.fetch);

export { userRoutes };
