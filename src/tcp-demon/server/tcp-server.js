'use strict';

import net from 'net';
import fs from 'fs';

let address = String;

const onData = (data) => {
  const hwinfo = data.toString('utf8');
  fs.writeFile(`${address}.json`, hwinfo, {encoding: 'utf8'}, (err) => {
    if (err)
      console.log(err);
  });
};

net.createServer(socket => {
  address = socket.address().address.replace(/:/g, '-');
  console.log('client connected');
  console.dir(socket.address());

  socket.setNoDelay(false);
  socket.write('server online');
  socket.on('data', onData);
  socket.on('end', () => {
    console.log(`client ${socket.address().address} disconnected`);
  });
}).listen(2000);
