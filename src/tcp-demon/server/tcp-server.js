'use strict';

import net from 'net';
import fs from 'fs';

const onData = (data, ...args) => {
  console.dir({ args });
  let hwinfo = data.toString('utf8');
  fs.writeFile('hwinfo.json', hwinfo, {encoding: 'utf8'}, (err) => {
    if (err)
      console.log(err);
  });
};

net.createServer(socket => {
  console.dir(socket.address());
  socket.setNoDelay(true);
  socket.write('server online');
  socket.on('data', onData);
}).listen(2000);
