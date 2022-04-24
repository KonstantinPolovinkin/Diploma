'use strict';

import {verify} from './verification/verify.js';
import {writeFile} from 'fs/promises';
import net from 'net';

net.createServer(socket => {
  socket.on('data', async data => {
    const jwt = JSON.parse(data)[0];
    const hwInfo = JSON.parse(data)[1];

    if (await verify(jwt)) {
      await writeFile('hwInfo.json', JSON.stringify(hwInfo, null, 2));
    } else {
      socket.destroy();
    }
  });
}).listen(2000);
