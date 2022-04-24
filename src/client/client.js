'use strict';

import {sign} from './sign/sign.js';
import net from 'net';

const hwInfo = [];


export async function sendInfoToServer(getHW) {
  const socket = new net.Socket();

  socket.connect({
    port: 2000,
    host: '127.0.0.1',
  }, async () => {
    const jwt = await sign();
    hwInfo.push(jwt);
    hwInfo.push(getHW);

    socket.write(JSON.stringify(hwInfo, null, 2));
    socket.end();
  });
}
