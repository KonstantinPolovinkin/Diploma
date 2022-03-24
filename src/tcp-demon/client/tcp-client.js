'use strict';

import net from 'net';
import fs from 'fs';

export function sendFileToServer() {
  const socket = new net.Socket();

  socket.on('data', data => {
    console.log(JSON.stringify(data.toString('utf8')));
  });

  socket.connect({
    port: 2000,
    host: '127.0.0.1',
  }, () => {
    socket.write(fs.readFileSync('./hwinfo.json'));
  });
};
