'use strict';

const net = require('net');
const fs = require('fs');

const socket = new net.Socket();
const hwinfo = fs.readFileSync('./hwinfo.txt');

socket.on('data', data => {
  console.log(JSON.stringify(data.toString('utf8')));
});

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, () => {
  socket.write(hwinfo);
});