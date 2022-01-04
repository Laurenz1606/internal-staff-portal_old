import { logger } from "@laurenz1606/logger";
import express from "express";
import UserModel from "../models/user";
import { sendData, sendServerError } from "../utils/senders";
import { authenticateToken } from "../utils/tokens";

//init the router
export const userRouter = express.Router();

//the /info endpoint
userRouter.get("/info", authenticateToken, async (req, res) => {
  try {
    //get the user from the token payload
    const user = await UserModel.findById(res.locals.payload._id);

    if (!user) {
      return sendData(res, 200, 0, null);
    }

    sendData(res, 200, 0, {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});
