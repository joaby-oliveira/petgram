// Imports
import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import multer from "multer";

import { NewImage } from "./NewImage";
import { GetAllImages } from "./GetAllImages";

// Code
dotenv.config();

const upload = multer({ dest: "uploads/" });

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Upload images
server.post("/image", upload.single("image"), NewImage);
server.get("/image", GetAllImages);

const port = process.env.PORT ?? 8000;
server.listen(port, () => {
  console.log(`Petgram is running on port ${port}`);
});
