import express from "express"
import * as UsersController from "../../../contrellers/UsersController"

const router = express.Router();

router.get("/", UsersController.getAuthUser);
router.post("/signup", UsersController.signup);
router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);

export default router;
