import { configDotenv } from "dotenv";
configDotenv();

export const storageConfig = {
    projectId: process.env.GCP_PROJECT_ID,
    bucketName: process.env.GCP_BUCKET_NAME,
    credentials: JSON.parse(process.env.GCS_SA_KEY_STRING),
};