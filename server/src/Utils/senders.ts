import { Response } from "express";

export function sendData(res: Response, status: number, code: number, data: any) {
  res.status(status).json({ code: code, err: false, data: data})
}

export function sendError(res: Response, status: number, code: number) {
  res.status(status).json({ code: code, err: true, data: null})
}

export function sendServerError(res: Response) {
  res.status(500).json({ code: 5, err: true, data: null})
}