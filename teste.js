const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

// HTTPS configuration
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/api2.zaploop.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api2.zaploop.xyz/fullchain.pem')
};

//'     /path/to/privkey.pem'),
//   /path/to/fullchain.pem')
//       /etc/letsencrypt/live/api2.zaploop.xyz/fullchain.pem
//       /etc/letsencrypt/live/api2.zaploop.xyz/


// Express.js app routes
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});

// HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server listening on port 443');
});





<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>My Socket.IO App</title>
  </head>
  <body>



    <h1>My Socket.IO App</h1>



</body>
</html>

<script>


// Connect to the server
const socket = io('https://api2.zaploop.xyz:3000/');

// Event handler for connecting to the server
socket.on('connect', () => {
  console.log('Connected to the server!');
});

// Event handler for receiving a message from the server
socket.on('message', (data) => {
  console.log(`Received message: ${data}`);
});

// Event handler for disconnecting from the server
socket.on('disconnect', () => {
  console.log('Disconnected from the server.');
});


</script>