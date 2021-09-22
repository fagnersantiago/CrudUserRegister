import { Router } from "express";
import UserController from "./controller/UserController";

const router = Router();

const userController = new UserController();

router.post("/user", userController.create);
router.get("/userList", userController.show);
router.get("/userListNickname", userController.listUserByNickname);
router.put("/updateLastName/:id", userController.updateLastName);
router.put("/updateNickname/:id", userController.updateNickname);
router.delete("/user/:id", userController.delete);

export default router;
