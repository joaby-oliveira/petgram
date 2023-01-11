// Imports
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";

import { newImage } from "./newImage";

// Code
dotenv.config();

const upload = multer({ dest: "uploads/" });

const server = express();

server.use(cors());

// Upload images
server.post("/image", upload.single("image"), newImage);

const port = process.env.PORT ?? 8000;
server.listen(port, () => {
  console.log(`Petgram is running on port ${port}`);
});
