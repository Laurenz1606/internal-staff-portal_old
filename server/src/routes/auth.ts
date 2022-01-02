import { logger } from "@laurenz1606/logger";
import express from "express";
import { compare, hash, hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import { promisify } from "util";
import sendmail from "sendmail";
import UserModel from "../models/user";
import { sendData, sendError, sendServerError } from "../utils/senders";
import {
  decodeAccessToken,
  decodeRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokens";
import { redisClient } from "../redisClient";
import { v4 } from "uuid";

//init the sendmail client with custom loggers
const mailSender = promisify(
  sendmail({
    logger: {
      debug: (...message: any[]) => {
        message.push("");
        logger(String(message[0]), "debug");
      },
      info: (...message: any[]) => {
        message.push("");
        logger(String(message[0]), "info");
      },
      warn: (...message: any[]) => {
        message.push("");
        logger(String(message[0]), "warn");
      },
      error: (...message: any[]) => {
        message.push("");
        logger(String(message[0]), "error");
      },
    },
  }),
);

//init the router
export const authRouter = express.Router();

//the /login endpoint
authRouter.post("/login", async (req, res) => {
  try {
    //get login and password from the body
    const { login, password } = req.body;

    //validate body values exists
    if (!login || !password) {
      return sendError(res, 400, 21);
    }

    //get the user from db
    const user1 = await UserModel.findOne({ email: login });
    const user2 = await UserModel.findOne({ username: login });

    //check if user exists
    if (!(user1 || user2)) {
      return sendError(res, 404, 22);
    }

    //create user
    let user = user1 ||
      user2 || {
        hashedPassword: "",
        _id: "",
        username: "",
        email: "",
        oneTimePassword: "",
      };

    //check if password matches
    if (!(await compare(password, user.hashedPassword))) {
      //check for 1time
      if (!(await compare(password, user.oneTimePassword))) {
        return sendError(res, 403, 23);
      }

      //remove the oneTimePassword
      await UserModel.updateOne({ _id: user._id }, { oneTimePassword: "" });
    }

    //generate the refreshToken
    const refreshToken = generateRefreshToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    //generate the accessToken
    const accessToken = generateAccessToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    //save the refreshToken
    await redisClient.sadd("refreshTokens", refreshToken);

    //send the tokens to the client
    return sendData(res, 200, 20, { accessToken, refreshToken });
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});

//the /logout endpoint
authRouter.post("/logout", async (req, res) => {
  try {
    //get refreshToken from the body
    const { refreshToken } = req.body;

    //validate body values exists
    if (!refreshToken) {
      return sendError(res, 400, 31);
    }

    //validate(decode) refreshToken
    const [err1] = decodeRefreshToken(refreshToken);

    //check for errors
    if (err1) {
      return sendError(res, 403, 32);
    }

    //check if token exists
    if (!(await redisClient.sismember("refreshTokens", refreshToken))) {
      return sendError(res, 404, 33);
    }

    //delete the token
    await redisClient.srem("refreshTokens", refreshToken);

    //send data
    return sendData(res, 200, 30, null);
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});

//the /refresh endpoint
authRouter.post("/refresh", async (req, res) => {
  try {
    //get refreshToken from the body
    const { refreshToken } = req.body;

    //validate body values exists
    if (!refreshToken) {
      return sendError(res, 400, 41);
    }

    //validate(decode) refreshToken
    const [err1, tokenData] = decodeRefreshToken(refreshToken);

    //check for errors
    if (err1) {
      return sendError(res, 403, 42);
    }

    //check if token exists
    if (!(await redisClient.sismember("refreshTokens", refreshToken))) {
      return sendError(res, 404, 43);
    }

    //generate new accessToken
    const accessToken = generateAccessToken({
      username: tokenData.username,
      email: tokenData.email,
      _id: tokenData._id,
    });

    //send data
    return sendData(res, 201, 40, { accessToken });
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});

//the /check endpoint
authRouter.post("/check", async (req, res) => {
  try {
    //get refreshToken from the body
    const { accessToken, refreshToken } = req.body;

    //validate body values exists
    if (!accessToken || !refreshToken) {
      return sendError(res, 400, 51);
    }

    //validate(decode) refreshToken
    const [err1] = decodeRefreshToken(refreshToken);

    //check for errors
    if (err1) {
      return sendError(res, 403, 52);
    }

    //check if token exists
    if (!(await redisClient.sismember("refreshTokens", refreshToken))) {
      return sendError(res, 404, 53);
    }

    //validate(decode) refreshToken
    const [err3] = decodeAccessToken(accessToken);

    //check for errors
    if (err3) {
      return sendError(res, 403, 54);
    }

    //send data
    return sendData(res, 200, 50, null);
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});

//the /get1time endpoint
authRouter.post("/get1time", async (req, res) => {
  try {
    //get login and password from the body
    const { login } = req.body;

    //validate body values exists
    if (!login) {
      return sendError(res, 400, 61);
    }

    //get the user from db
    const user1 = await UserModel.findOne({ email: login });
    const user2 = await UserModel.findOne({ username: login });

    //check if user exists
    if (!(user1 || user2)) {
      return sendError(res, 404, 62);
    }

    //create user
    let user = user1 ||
      user2 || {
        hashedPassword: "",
        _id: "",
        username: "",
        email: "",
        oneTimePassword: "",
      };

    //generate the oneTimePassword
    const oneTimePassword = randomBytes(32).toString("hex");

    //update the user
    await UserModel.updateOne(
      { _id: user._id },
      { oneTimePassword: await hash(oneTimePassword, 10) },
    );

    //send the password to the users email
    await mailSender({
      from: "passwort@isp.mk-return.de",
      subject: "Dein Einmalpasswort!",
      to: user.email,
      html: `Du hast ein Einmalpasswort angefordert, gebe das Passwort anstatt deines normalen Passwortes im Login ein! Dein Einmalpasswort ist: ${oneTimePassword}`,
    });

    //send success to the client
    return sendData(res, 200, 60, null);
  } catch (err) {
    //log the error
    logger(String(err), "error");

    //send err to client
    return sendServerError(res);
  }
});
