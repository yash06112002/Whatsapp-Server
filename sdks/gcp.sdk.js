import { Storage } from '@google-cloud/storage';
import { storageConfig } from '../config/storage.config.js';

class GoogleCloudSDK {
    constructor() {
        this.storage = new Storage({
            projectId: storageConfig.projectId,
            credentials: storageConfig.credentials,
        });
        this.bucket = this.storage.bucket(storageConfig.bucketName);
    }

    async uploadFile(file) {
        const fileName = `${Date.now()}_${file.originalname}`;
        const blob = this.bucket.file(fileName);

        return new Promise((resolve, reject) => {
            const blobStream = blob.createWriteStream();

            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/${storageConfig.bucketName}/${fileName}`;
                resolve(publicUrl);
            });

            blobStream.end(file.buffer);
        });
    }
}

export default new GoogleCloudSDK();