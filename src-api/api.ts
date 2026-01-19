import { firestore, rtdb } from './db';
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

app.get(/.*/, (req, res) => {
    let url: string = path.join(__dirname, "..", 'dist', "index.html");
    res.sendFile(url)
});

app.listen(PORT, () => {
    console.log(`Servidor prendido en el puerto ${PORT}...`)
})