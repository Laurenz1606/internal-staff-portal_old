import { logger } from "@laurenz1606/logger";
import express from "express";
import UserModel from "../models/user";
import { sendData, sendServerError } from "../utils/senders";
import { authenticateToken } from "../utils/tokens";

//init the router
export const documentRouter = express.Router();

