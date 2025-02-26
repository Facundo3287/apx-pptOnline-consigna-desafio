fetch('http://localhost:8000/')
.then( res => { return res.text() } )
.then( data => { console.log(data) } )