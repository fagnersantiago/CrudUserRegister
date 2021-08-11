import { Router } from "express";
import UserController from "./controller/UserController";

const router = Router();

const userController = new UserController();

router.post("/user", userController.create);
router.get("/userList", userController.show);
router.get("/userListNickname", userController.showUserByNickname);
router.put("/update/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;
