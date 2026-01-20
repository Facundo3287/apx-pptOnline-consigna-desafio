import state from './state.js';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";

let firebaseConfig = {
    authDomain: "apx-chat-9e04b.firebaseapp.com",
    databaseURL: "https://apx-chat-9e04b-default-rtdb.firebaseio.com/",
    projectId: "apx-chat-9e04b" };
let app = initializeApp(firebaseConfig);
let rtdb = getDatabase(app);

export default function conectedRtdb (estado: any): Promise <Boolean> {
    return new Promise((resolve) => {
        let refNew = `Rooms/${estado.longId}`;
        let roomRef = ref(rtdb, refNew); 
        onValue(roomRef, (snapshot) => {
            let data = snapshot.val();
            state.stateCoordinadorRtdb(data);
            resolve(true)
        })
    })
};
        
