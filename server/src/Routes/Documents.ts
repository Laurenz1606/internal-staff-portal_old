import { logger } from "@laurenz1606/logger";
import express from "express";
import UserModel from "../Models/User";
import { sendData, sendServerError } from "../Utils/senders";
import { authenticateToken } from "../Utils/tokens";

//init the router
export const documentRouter = express.Router();

