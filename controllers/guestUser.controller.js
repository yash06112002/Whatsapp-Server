import express from 'express';
import { guestUserService } from '../services/guestUser.service.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Guest User controller is running');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await guestUserService.getGuestUser(id);
        res.send(data);
    } catch (error) {
        console.error('Redis Client Error', error);
    }
});

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const existingUserData = await guestUserService.getGuestUser(id);
        if (existingUserData) {
          return res.send(existingUserData);
        }
        const data = await guestUserService.setGuestUser(id);
        res.send(data);
    } catch (error) {
        console.error('Redis Client Error', error);
    }
});

router.post("/:guestId/manual-message", async (req, res) => {
  const { guestId } = req.params;

  try {
    let data = await guestUserService.getGuestUser(guestId);
    if (data.manualMessagesLeft > 0) {
      data = await guestUserService.decreaseManualMessagesLeft(guestId);
      res.send(data);
    } else {
      res.status(400).send("No manual messages left");
    }
  } catch (error) {
    console.error("Redis Client Error", error);
  }
});

router.post("/:guestId/auto-message", async (req, res) => {
  const { guestId } = req.params;
  try {
    let data = await guestUserService.getGuestUser(guestId);
    
    if (data.autoMessagesLeft > 0) {
      data = await guestUserService.decreaseAutoMessagesLeft(guestId);
      res.send(data);
    } else {
      res.status(400).send("No auto messages left");
    }
  } catch (error) {
    console.error("Redis Client Error", error);
  }
});



export default router;