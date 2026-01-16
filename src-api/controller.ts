import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

let PORT: any = process.env.PORT || 8000;
let ruta: string = import.meta.url;
let __dirname: string = fileURLToPath(ruta);
__dirname = path.dirname(__dirname);  
let url: string = path.join(__dirname, "..", 'dist-front');
let app = express();
app.use(express.static(url));
app.use(cors());

app.get(/.*/, (req, res) => {
    let url: string = path.join(__dirname, "..", 'dist-front', "index.html");
    res.sendFile(url)
});

app.listen(PORT, () => {
    console.log(`Servidor prendido en el puerto ${PORT}...`)
})