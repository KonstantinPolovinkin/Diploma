'use strict';

import net from 'net';
import fs from 'fs';

export function sendFileToServer() {
  const socket = new net.Socket();

  socket.on('data', data => {
    console.log(data.toString('utf8'));
  });

  socket.connect({
    port: 2000,
    host: '44.203.146.186',
  }, () => {
    socket.write(fs.readFileSync('./hwinfo.json'));
    socket.end();
  });
};
