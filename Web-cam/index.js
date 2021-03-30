const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const WCap = new cv.VideoCapture(0);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    const frame = WCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image', 'some data');
}, 1000)

server.listen(3000);