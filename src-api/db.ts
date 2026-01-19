import dotenv from 'dotenv-esm';
import admin from 'firebase-admin';
//import serviceAccount from './key.json' with { type: 'json' };
dotenv.config();

let serviceAccount = JSON.parse(process.env.DB_KEY!);
admin.initializeApp ({ 
        credential: admin.credential.cert(serviceAccount as any), 
        databaseURL: "https://apx-chat-9e04b-default-rtdb.firebaseio.com"});
let firestore = admin.firestore();
let rtdb = admin.database();

export { firestore, rtdb } 