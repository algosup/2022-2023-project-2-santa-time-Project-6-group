// Use express to serve the static files and load the index.html, style.css and app.js files
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

var favicon = require('serve-favicon');


app.use(express.static(path.join(__dirname, 'public')));


// set the shortcut icon for the page
app.use(favicon(path.join(__dirname,'public','img','sleigh.png')));

// render the index.html file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'SantaClock.html'));
    }
);

// Handle 404 requests
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server 
app.listen(port, () => console.log(`Listening on port ${port}`));

