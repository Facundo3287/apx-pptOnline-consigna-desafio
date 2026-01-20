import { firestore, rtdb } from './db.js';
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';

let PORT: any = process.env.PORT || 8000;
let ruta: string = import.meta.url;
let __dirname: string = fileURLToPath(ruta);
__dirname = path.dirname(__dirname);  
let url: string = path.join(__dirname, "..", 'dist');
let app = express();
app.use(express.static(url));
app.use(express.json());
app.use(cors());

app.post('/cuenta', (req, res) => {
    let query = firestore.collection('usuarios').where('nombre', '==', req.body.nombre);
    query.get().then(querySnapshot => {
        if (querySnapshot.size == 1) {
            querySnapshot.forEach(documentSnapshot => {
                let path: string = documentSnapshot.ref.path;
                let idUser: string = path.slice(9);
                let respuesta = {verificacion: true, idUser };
                res.json(respuesta) });
        } 
        else if (querySnapshot.size == 0) {
            let idUser: string = uuidv4();
            let collectionRef = firestore.collection('usuarios');
            let documentRef = collectionRef.doc(idUser);
            documentRef.set(req.body).then( (aux) => { 
                let respuesta = {verificacion: false, idUser };
                res.json(respuesta) } )
        }
    }); 
}); 

app.post('/crearRoom', (req, res) => { 
    let longId: string = uuidv4();
    let shortId: string = longId.slice(0, 5);
    let roomData = { 
        creador: req.body.idUser,
        preparados: 0,
        jugadas: { propietario: 'null', invitado: 'null' } };
    rtdb.ref(`/Rooms/${longId}`)
    .set(roomData)
    .then( (aux) => { 
        let respuesta = { newRoom: true, longId: longId, shortId: shortId,  };
        res.json(respuesta) } )
    .catch( (err) => { 
        console.log('/crearRoom => error');
        let respuesta = { newRoom: false };
        res.send(respuesta) } )
});

app.post('/guardarRoom', (req, res) => {
    let contenido = { room: req.body.longId };
    let documentRef = firestore.doc(`rooms/${req.body.shortId}`);
    documentRef.set(contenido)
    .then( aux => { 
        let respuesta = { registro: true };
        res.json(respuesta) } )
    .catch( (err) => { 
        console.log('/guardarRoom => error');
        let respuesta = { registro: false };
        res.json(respuesta) })
});

app.post('/buscarRoom', (req, res) => {
    let documentRef = firestore.doc(`rooms/${req.body.shortId}`);
    documentRef.get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
            let data = documentSnapshot.data();
            let respuesta = { busqueda: true, longId: data };
            res.json(respuesta) }
        else {
            console.log('/buscarRoom => error');
            let respuesta = { busqueda: false };
            res.json(respuesta) }
    })
});

app.post('/preparado', async (req, res) => {
    try {
        let ref = rtdb.ref();
        let snapshot = await ref.child("Rooms").child(req.body.longId).get();
        let data = snapshot.val();
        if (data == null) { 
            throw 'error' }
        else if (data != null && data.preparados == 0) { 
            data.preparados = 1;
            await rtdb.ref(`Rooms/${req.body.longId}`).set(data);
            let respuesta = { resultado: true };
            res.json(respuesta) }
        else if (data != null && data.preparados == 1) { 
            data.preparados = 2;
            await rtdb.ref(`Rooms/${req.body.longId}`).set(data);
            let respuesta = { resultado: true };
            res.json(respuesta) } }
    catch(e) {
        console.log('/preparado => error');
        let respuesta = { respuesta: false };
        res.status(500);
        res.json(respuesta) }
});

app.post('/subirJugada', async (req, res) => {
    try {
        console.log('/subirJugada => ', req.body);
        let ref = rtdb.ref();
        let snapshot = await ref.child("Rooms").child(req.body.longId).get();
        let data = snapshot.val();
        if (req.body.rol == 'propietario') {
            console.log('/subirJugada => 1 => ', data);
            data.jugadas.propietario = req.body.jugada;
            console.log('/subirJugada => 1 => ', data);
            await rtdb.ref(`Rooms/${req.body.longId}`).set(data) }
        else if (req.body.rol == 'invitado') {
            console.log('/subirJugada => 2 => ', data);
            data.jugadas.invitado = req.body.jugada;
            console.log('/subirJugada => 2 => ', data);
            await rtdb.ref(`Rooms/${req.body.longId}`).set(data) };
        console.log('--------------------------------------------------------');
        let respuesta = { respuesta: true };
        res.json(respuesta) }
    catch(e) {
        console.log('/subirJugada => error');
        let respuesta = { respuesta: false };
        res.status(500);
        res.json(respuesta) }
});

app.get(/.*/, (req, res) => {
    let url: string = path.join(__dirname, "..", 'dist', "index.html");
    res.sendFile(url)
});

app.listen(PORT, () => {
    console.log(`Servidor prendido en el puerto ${PORT}...`)
})