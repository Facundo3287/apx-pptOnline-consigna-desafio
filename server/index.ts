import express from 'express';

let app = express();
app.use(express.static('dist'));

app.get('/messi', (req, res) => { 
    console.log('nueva solicitud');
    res.send('/index.js') } );
    
app.listen(8000, () => { console.log('server encendido...') } )