import S3 from "aws-sdk/clients/s3";
import dotenv from "dotenv";
import fs, { ReadStream, unlink, unlinkSync } from "fs";

dotenv.config();

const {
  AWS_BUCKET_NAME,
  AWS_BUCKET_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY_SECRET,
} = process.env;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_ACCESS_KEY_SECRET,
});

// Upload file to S3
export function uploadFile(
  file: Express.Multer.File
): Promise<S3.ManagedUpload.SendData> {
  const fileStream: ReadStream = fs.createReadStream(file.path);

  const uploadParams: S3.Types.PutObjectRequest = {
    Bucket: AWS_BUCKET_NAME ?? "",
    Body: fileStream,
    Key: file.filename,
  };

  const uploadedFile: Promise<S3.ManagedUpload.SendData> = s3
    .upload(uploadParams)
    .promise();

  uploadedFile.then(() => {
    unlinkSync(fileStream.path);
  });

  return uploadedFile;
}

export function getAllImages() {
  const getAllParams: S3.Types.ListObjectsRequest = {
    Bucket: "petgram-images",
    Delimiter: "/",
  };

  const imagesList: Promise<S3.ListObjectsOutput> = s3
    .listObjectsV2(getAllParams)
    .promise();

  return imagesList;
}
