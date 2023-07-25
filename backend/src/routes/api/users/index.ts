import express from "express"
import * as UsersController from "../../../contrellers/UsersController"

const router = express.Router();

router.post("/signup", UsersController.signup);
router.post("/login", UsersController.login);

export default router;
