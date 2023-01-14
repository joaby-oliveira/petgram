import S3 from "aws-sdk/clients/s3";

import { Request, Response } from "express";
import { uploadFile } from "./s3";

export async function NewImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.sendStatus(400);
    }
    const createdFile: S3.ManagedUpload.SendData = await uploadFile(req.file);
    console.log(createdFile);

    res.statusCode = 201;
    res.json({
      message: "Success on create file",
      createdFile,
    });

    return;
  } catch (err) {
    console.log(err);
  }
}
