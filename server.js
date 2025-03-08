import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mediaController from './controllers/media.controller.js';
import autoMessageController from './controllers/auto-message.controller.js';
import guestUserController from './controllers/guestUser.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Media Server is running');
});

app.use('/media', mediaController);
app.use('/auto-message', autoMessageController);
app.use('/guest-user', guestUserController);

app.listen(port, () => {
    console.log('HTTPS Server running on port ' + port);
});
