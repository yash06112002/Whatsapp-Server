import express from 'express';
import multer from 'multer';
import { uploadFile } from '../services/storage.service.js';

const router = express.Router();
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.get('/', (req, res) => {
    res.send('Media Controller is running');
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const publicUrl = await uploadFile(req.file);
        res.status(200).json({ success: true, filePath: publicUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
