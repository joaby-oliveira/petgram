import { Request, Response } from "express";
import { getAllImages } from "./s3";

export async function GetAllImages(req: Request, res: Response) {
  try {
    const imagesList = await getAllImages();
    res.json(imagesList);
  } catch (err) {
    res.json(err);
  }
}
