'use strict';

import net from 'net';
import fs from 'fs';

export function sendFileToServer() {
  const socket = new net.Socket();

  socket.connect({
    port: 2000,
    host: '44.203.146.186',
  }, () => {
    socket.write('password SX*G6.Kpe8wch&i');
    socket.on('data', data => {
      console.log(data.toString('utf8'));

      if (data.toString('utf8') === 'password is correct') {
        socket.write('hw' + fs.readFileSync('./hwinfo.json'));
        socket.end();
      } else if (data.toString('utf8') === 'incorrect password') {
        console.log('disconnected by the server');
        socket.end();
      } else {
        console.log('disconnected by the server');
        socket.end();
      }
    });
  });
};
