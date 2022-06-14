import express from "express";
import {
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
