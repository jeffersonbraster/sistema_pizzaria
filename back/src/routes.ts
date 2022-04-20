import { Router } from "express";
import CreateUserController from "./controllers/user/CreateUserController";
import AuthUserController from "./controllers/user/AuthUserController";

const router = Router();

router.post("/users", new CreateUserController().handler);

router.post("/session", new AuthUserController().handler);

export { router };
