import { logger } from "@laurenz1606/logger";
import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { sendError, sendServerError } from "./senders";

export function generateAccessToken(tokendata: any) {
  //check for accesssToken secret
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("process.env.JWT_ACCESS_TOKEN_SECRET is not defined");
  }

  //check for expiresIn
  if (!process.env.JWT_EXPIRESIN) {
    throw new Error("process.env.JWT_EXPIRESIN is not defined");
  }

  //create the token and return it
  return sign(tokendata, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRESIN}s`,
  });
}

export function generateRefreshToken(tokendata: any) {
  //check for refreshToken secret
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("process.env.JWT_REFRESH_TOKEN_SECRET is not defined");
  }

  //create the token and return it
  return sign(tokendata, process.env.JWT_REFRESH_TOKEN_SECRET);
}

export function decodeAccessToken(accessToken: string): [boolean, any] {
  //check for accesssToken secret
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error("process.env.JWT_ACCESS_TOKEN_SECRET is not defined");
  }

  //try to decode the token else return error
  try {
    //decode the token
    const tokendata: any = verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );
    return [false, tokendata];
  } catch (err) {
    logger(String(err), "warn");
    return [true, null];
  }
}

export function decodeRefreshToken(refreshToken: string): [boolean, any] {
  //check for refreshToken secret
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw new Error("process.env.JWT_REFRESH_TOKEN_SECRET is not defined");
  }

  //try to decode the token else return error
  try {
    //decode the token
    const tokendata: any = verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );
    return [false, tokendata];
  } catch (err) {
    logger(String(err), "warn");
    return [true, null];
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    //get the token from the header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //validate token exists on request
    if (!token) {
      return sendError(res, 400, 1);
    }

    //decode/check the accessToken
    const [err, payload] = decodeAccessToken(token);

    //check for errors
    if (err) {
      return sendError(res, 403, 2);
    }

    //save the payload to res.locals
    res.locals.payload = payload;

    //call next middleware
    next();
  } catch (err) {
    //send server error
    logger(String(err), "error");
    sendServerError(res);
  }
}
