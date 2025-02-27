let url = process.env.RENDER_EXTERNAL_URL + '/messi' || 'http://localhost:8000/messi';
console.log(url);
// let url = process.env.RENDER_EXTERNAL_URL + '/newMenssaje';
fetch(url)
.then( res => { return res.text() } )
.then( data => { console.log(data) } )