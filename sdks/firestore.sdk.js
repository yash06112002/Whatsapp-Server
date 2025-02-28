import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SA_KEY_STRING)),
});

export const firebaseAdmin = admin;

