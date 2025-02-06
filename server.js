import fs from 'fs';
import https from 'https';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Storage } from '@google-cloud/storage';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: JSON.parse(process.env.GCP_SA_KEY_STRING),
});

app.use(express.json());
app.use(cors());

const bucketName = process.env.GCP_BUCKET_NAME;

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

app.get('/', (req, res) => {
    res.send('Media Server is running'); 
});
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const blob = storage.bucket(bucketName).file(fileName);
    
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        console.log(err);
        res.status(500).send(err);
    });

    blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        res.status(200).json({ success: true, filePath: publicUrl });
    });

    blobStream.end(req.file.buffer);
});

const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log('HTTPS Server running on port ' + port);
});
