// Use express to serve the static files and load the index.html, style.css and app.js files
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

var favicon = require('serve-favicon');


app.use(express.static(path.join(__dirname, 'public')));


// set the shortcut icon for the page
app.use(favicon(path.join(__dirname,'public','img','Sleigh.png')));

// render the index.html file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','static', 'SantaClock.html'));
    }
);

// Handle 404 requests
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname,'public','static', '404.html'));
});

app.get('/License', function (req, res,html) {
    res.sendFile(path.join(__dirname,'public','static','Licenses.html'));
   });



// Start the server 
// app.listen(port, () => console.log(`Listening on port ${port}`));

// Serve http directly
const http = require('http');
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port: http://127.0.0.1:${port}`));


