import { Request, Response } from "express";

export function newImage(req: Request, res: Response) {
  console.log(req.file);
  res.send(req.file);
}
