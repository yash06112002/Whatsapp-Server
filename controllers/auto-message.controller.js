import express from 'express';
import { firebaseAdmin } from '../sdks/firestore.sdk.js';

const agents = [
    {
        name: 'Alex',
        context: 'You are a friendly tech enthusiast who loves helping others with tech problems'
    },
    {
        name: 'Sam',
        context: 'You are a senior software developer who provides technical insights'
    },
    {
        name: 'Jordan',
        context: 'You are a product manager who brings user perspective to discussions'
    }
];

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Automessage Controller is running');
});

router.post('/generate', async (req, res) => {
    try {
        const db = firebaseAdmin.firestore();
        const { roomId } = req.body;
        const messages = await db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'desc').get().then(snapshot => snapshot.docs.map(doc => doc.data()));
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Assume ${randomAgent.context}, given the chat context: ${messages.map(m => `${m.name}: ${m.message}`).join('\n')}\n\nGenerate a natural response as ${randomAgent.name} which is not similar to previous ones and in case there is no previous message, start with a greeting. Response should be less than 200 characters`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const result = data.candidates[0].content.parts[0].text;
        const aiMessage = {
            message: result,
            name: randomAgent.name,
            timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
            isAI: true
        };
        await db.collection('rooms').doc(roomId).collection('messages').add(aiMessage);
        res.json({ success: true, message: result });
    } catch (error) {
        console.error('Error generating AI message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
