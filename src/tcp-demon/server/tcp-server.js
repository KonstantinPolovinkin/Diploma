'use strict';

import net from 'net';
import fs from 'fs';

async function CreateStorageDir(HWstorageDirectory) {
  if (!fs.existsSync(HWstorageDirectory)) {
    fs.mkdirSync(HWstorageDirectory);
  }
}

async function getBaseBoardSerial(data) {
  const baseBoardSerial = JSON.parse(data)[2].serial;
  const HWstorageDirectory = `./${baseBoardSerial}`;

  await CreateStorageDir(HWstorageDirectory);
  WriteLocalFile(data, baseBoardSerial, HWstorageDirectory);
}

function WriteLocalFile(data, baseBoardSerial, HWstorageDirectory) {
  const hwinfo = JSON.parse(data);
  fs.writeFile(`./${HWstorageDirectory}/${baseBoardSerial}.json`, JSON.stringify(hwinfo, null, 2), (err) => {
    if (err)
      console.log(err);
  });
}

const onData = async (data) => {
  getBaseBoardSerial(data);
};

net.createServer(socket => {
  console.log('client connected');
  console.dir(socket.address());

  socket.setNoDelay(false);
  socket.write('server online');
  socket.on('data', onData);
  socket.on('end', () => {
    console.log(`client ${socket.address().address} disconnected`);
  });
}).listen(2000);
