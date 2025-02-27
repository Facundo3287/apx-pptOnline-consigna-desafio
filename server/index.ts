import express from 'express';

let app = express();
app.use(express.static('dist'));
let port = process.env.PORT || 8000;
console.log('====> ', port);

app.get('/messi', (req, res) => { 
    console.log('nueva solicitud');
    res.send('/index.js') } );
    
app.listen(port, () => { console.log('server encendido...') } )