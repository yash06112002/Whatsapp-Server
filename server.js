import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Storage } from '@google-cloud/storage';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;
const storage = new Storage({
    projectId: 'atomic-nation-447006-p5',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

app.use(express.json());
app.use(cors());

const bucketName = 'whatsapp-group-chat-media';

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const blob = storage.bucket(bucketName).file(fileName);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        console.error(err);
        res.status(500).send('Failed to upload file.');
    });

    blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        res.status(200).json({ success: true, filePath: publicUrl });
    });

    blobStream.end(req.file.buffer);
});

app.listen(port, () => console.log('Server running on port ' + port));
