import { sign, verify } from "jsonwebtoken";

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
    console.error(err)
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
    console.error(err)
    return [true, null];
  }
}